'use client'

import { useEffect, useState } from 'react'
import cookie from 'js-cookie'
import { api } from '@/lib/axios'
import { User } from 'lucide-react'
import Image from 'next/image'
import { RegisterCustomerModal } from './RegisterCustomerModal'

interface Customer {
  id: string
  name: string
  email: string
  avatarUrl: string
  address: string
  phone: string
}

export function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  async function loadCustomers() {
    try {
      const token = cookie.get('token')

      const response = await api.get('/customers', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setCustomers(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadCustomers()
    setLoading(false)
  }, [])

  function handleCreateCustomer(customer: Customer) {
    setCustomers((prevState) => prevState.concat(customer))
  }

  if (loading) {
    return <p className="mt-4 text-center">Carregando...</p>
  }

  return (
    <div className="mb-8 mr-8 space-y-2 text-right">
      <RegisterCustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateCustomer={handleCreateCustomer}
      />

      <button
        onClick={() => setIsModalOpen(true)}
        className="rounded-lg bg-orange-500 p-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
      >
        Cadastrar cliente
      </button>

      <div className="rounded-lg border border-zinc-200 p-4">
        <table className="min-w-full table-auto p-8 text-sm">
          <thead>
            <tr className="text-xs text-zinc-600">
              <th className="px-4 py-2 text-left uppercase">Nome</th>
              <th className="px-4 py-2 text-left uppercase">E-mail</th>
              <th className="px-4 py-2 text-left uppercase">Telefone</th>
              <th className="px-4 py-2 text-left uppercase">Endereço</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className=" px-4 py-2 text-left">
                  <div className="flex items-center gap-2">
                    {customer.avatarUrl ? (
                      <Image
                        src={customer.avatarUrl}
                        width={24}
                        height={24}
                        alt=""
                        className="h-8 w-8 rounded-full"
                      />
                    ) : (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border border-zinc-400 bg-zinc-200">
                        <User className="h-4 w-4 text-zinc-400" />
                      </div>
                    )}

                    <div className="text-xs font-medium">{customer.name}</div>
                  </div>
                </td>
                <td className=" px-4 py-2 text-left">{customer.email}</td>
                <td className=" px-4 py-2 text-left">{customer.phone}</td>
                <td className=" px-4 py-2 text-left">{customer.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
