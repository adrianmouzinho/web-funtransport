'use client'

import { FormEvent, useEffect, useState } from 'react'
import cookie from 'js-cookie'
import { api } from '@/lib/axios'
import { Loading } from '../Loading'
interface ConfirmPickupModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ConfirmPickupModal({
  isOpen,
  onClose,
}: ConfirmPickupModalProps) {
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    function handleClickOverlay(event: MouseEvent) {
      if (event.target === document.querySelector('.overlay')) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('click', handleClickOverlay)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('click', handleClickOverlay)
    }
  }, [onClose])

  if (!isOpen) {
    return null
  }

  async function confirmRentalPickup(event: FormEvent) {
    event.preventDefault()

    if (code.length !== 6) {
      setError('A código precisa ter 6 caracteres')
      return
    }

    setLoading(true)

    try {
      const token = cookie.get('token')

      const response = await api.patch(
        '/rentals/confirm/pickup',
        {
          code,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (response.status === 200) {
        setSuccess(
          `O status do aluguel de código ${code} foi alterado para ativo!`,
        )
        setError(null)
      }

      setLoading(false)
    } catch (error: any) {
      setLoading(false)

      if (error.response.status === 400) {
        setError(error.response.data.error)
        setSuccess(null)
        return
      }

      console.error(error)
    }
  }

  function handleCloseModal() {
    setSuccess(null)
    setError(null)
    setCode('')
    onClose()
  }

  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-black/75">
      <form
        onSubmit={confirmRentalPickup}
        className="flex w-full  max-w-xs flex-col gap-4  rounded-lg bg-white p-6"
      >
        <label className="flex flex-col gap-1 text-sm font-semibold">
          Digite o código do aluguel
          <input
            type="text"
            placeholder="ABC123"
            className="h-10 rounded border border-zinc-300 px-2 font-normal text-zinc-600 placeholder:text-zinc-500 focus:outline focus:outline-emerald-300"
            name="code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
          />
        </label>

        {error && <span className="text-sm text-red-500">{error}</span>}

        {success && <span className="text-sm text-green-500">{success}</span>}

        <div className="grid grid-cols-2 gap-1">
          <button
            type="button"
            onClick={handleCloseModal}
            className="h-10 rounded bg-pink-500 font-semibold text-white transition-colors hover:bg-pink-600"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={loading}
            className="flex h-10 items-center justify-center rounded bg-zinc-900 font-semibold text-white transition-colors hover:bg-zinc-800"
          >
            {loading ? <Loading /> : 'Confirmar'}
          </button>
        </div>
      </form>
    </div>
  )
}
