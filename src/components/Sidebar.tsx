'use client'

import { Users, ArrowDownUp, HelpCircle, Bike } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { useState } from 'react'
import { ConfirmPickupModal } from './ConfirmPickupModal'
import { ConfirmRentalReturn } from './ConfirmRentalReturn'
import logo from '@/assets/logo.svg'

export function Sidebar() {
  const [isConfirmPickupModalOpen, setIsConfirmPickupModalOpen] =
    useState(false)
  const [isConfirmReturnModalOpen, setIsConfirmReturnModalOpen] =
    useState(false)
  const activeSegment = useSelectedLayoutSegment()

  function handleOpenConfirmPickupModal() {
    setIsConfirmReturnModalOpen(false)
    setIsConfirmPickupModalOpen(true)
  }

  function handleOpenConfirmReturnModal() {
    setIsConfirmPickupModalOpen(false)
    setIsConfirmReturnModalOpen(true)
  }

  return (
    <aside className="sticky top-0 flex h-full max-h-screen items-center justify-center overflow-hidden">
      <ConfirmPickupModal
        isOpen={isConfirmPickupModalOpen}
        onClose={() => setIsConfirmPickupModalOpen(false)}
      />

      <ConfirmRentalReturn
        isOpen={isConfirmReturnModalOpen}
        onClose={() => setIsConfirmReturnModalOpen(false)}
      />

      <div className="flex h-full max-h-[564px] w-full max-w-[240px] flex-col justify-between rounded-lg border border-zinc-200 p-6">
        <div className="space-y-4">
          <Image src={logo} alt="Logo da Funtransport" />

          <nav>
            <Link
              href="/"
              className={`flex items-center gap-2 rounded-lg p-2 text-sm transition-colors hover:bg-zinc-200 hover:font-medium ${
                activeSegment === null && 'bg-zinc-200 font-medium'
              }`}
            >
              <ArrowDownUp className="h-4 w-4" />
              Aluguéis
            </Link>

            <Link
              href="/customers"
              className={`flex items-center gap-2 rounded-lg p-2 text-sm transition-colors hover:bg-zinc-200 hover:font-medium ${
                activeSegment === 'customers' && 'bg-zinc-200 font-medium'
              }`}
            >
              <Users className="h-4 w-4" />
              Clientes
            </Link>

            <Link
              href="/products"
              className={`flex items-center gap-2 rounded-lg p-2 text-sm transition-colors hover:bg-zinc-200 hover:font-medium ${
                activeSegment === 'products' && 'bg-zinc-200 font-medium'
              }`}
            >
              <Bike className="h-4 w-4" />
              Equipamentos
            </Link>
          </nav>
        </div>

        <div>
          <div className="space-y-1">
            <button
              onClick={handleOpenConfirmPickupModal}
              className="flex w-full items-center gap-2 rounded-lg bg-pink-200 p-2 text-sm font-medium transition-colors hover:bg-pink-300"
            >
              Confirmar retirada
            </button>

            <button
              onClick={handleOpenConfirmReturnModal}
              className="flex w-full items-center gap-2 rounded-lg bg-pink-200 p-2 text-sm font-medium transition-colors hover:bg-pink-300"
            >
              Confirmar devolução
            </button>
          </div>

          <Link
            href="/help"
            className={`flex items-center gap-2 rounded-lg p-2 text-sm transition-colors hover:bg-zinc-200 hover:font-medium ${
              activeSegment === 'help' && 'bg-zinc-200 font-medium'
            }`}
          >
            <HelpCircle className="h-4 w-4" />
            Ajuda
          </Link>
        </div>
      </div>
    </aside>
  )
}
