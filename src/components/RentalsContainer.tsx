'use client'

import { useEffect, useState } from 'react'
import cookie from 'js-cookie'
import { Rentals } from '@/components/Rentals'
import { Status } from '@/components/Status'
import { api } from '@/lib/axios'

const status = [
  {
    id: 1,
    name: 'Todos',
  },
  {
    id: 2,
    name: 'Pendente',
  },
  {
    id: 3,
    name: 'Ativo',
  },
  {
    id: 4,
    name: 'Cancelado',
  },
  {
    id: 5,
    name: 'Concluído',
  },
]

interface Rental {
  id: string
  code: string
  createdAt: string
  status: string
  duration: number
  price: number
}

export function RentalsContainer() {
  const [activeStatus, setActiveStatus] = useState('Todos')
  const [rentals, setRentals] = useState<Rental[]>([])
  const [loading, setLoading] = useState(true)

  async function loadRentals() {
    try {
      const token = cookie.get('token')

      const response = await api.get('/rentals', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setRentals(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadRentals()
    setLoading(false)
  }, [])

  async function handleChangeStatus(status: string) {
    setActiveStatus(status)
    setLoading(true)

    const token = cookie.get('token')

    const router =
      status === 'Todos' || !status ? '/rentals' : `/rentals?status=${status}`

    try {
      const { data } = await api.get(router, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setRentals(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <main className="mr-8 space-y-8">
      <Status
        activeStatus={activeStatus}
        onChangeStatus={handleChangeStatus}
        status={status}
      />

      {loading ? (
        <p className="mt-4 text-center">Carregando...</p>
      ) : (
        <Rentals rentals={rentals} />
      )}
    </main>
  )
}
