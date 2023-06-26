'use client'

import { useEffect, useState } from 'react'
import cookie from 'js-cookie'
import { api } from '@/lib/axios'
import { RentalFilters } from './RentalFilters'
import { RentalsTable } from './RentalsTable'

const rentalStatus = [
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

export function Rentals() {
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
      console.error(error)
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
      console.error(error)
      setLoading(false)
    }
  }

  return (
    <main className="mb-8 mr-8 space-y-8">
      <RentalFilters
        activeStatus={activeStatus}
        onChangeStatus={handleChangeStatus}
        status={rentalStatus}
      />

      {loading ? (
        <p className="mt-4 text-center">Carregando...</p>
      ) : (
        <RentalsTable rentals={rentals} />
      )}
    </main>
  )
}
