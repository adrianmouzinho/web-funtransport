'use client'

import { useState } from 'react'
import { Rentals } from '@/components/Rentals'
import { Status } from '@/components/Status'

const categories = [
  {
    id: 2,
    name: 'Ativo',
  },
  {
    id: 3,
    name: 'Pendente',
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

const rentalsMock = [
  {
    id: 1,
    customerName: 'Willame Mouzinho',
    status: 'Ativo',
    duration: 60,
    customerEmail: 'willame.mouzinho@gmail.com',
  },
  {
    id: 2,
    customerName: 'Lailla Galeno',
    status: 'Ativo',
    duration: 60,
    customerEmail: 'lailla.galeno@gmail.com',
  },
  {
    id: 3,
    customerName: 'Matheus Araujo',
    status: 'Pendente',
    duration: 60,
    customerEmail: 'matheus.araujo@gmail.com',
  },
  {
    id: 4,
    customerName: 'Thiago Aquino',
    status: 'Concluído',
    duration: 60,
    customerEmail: 'thiago.aquino@gmail.com',
  },
  {
    id: 5,
    customerName: 'Bruna Silva',
    status: 'Cancelado',
    duration: 60,
    customerEmail: 'bruna.silva@gmail.com',
  },
]

export function RentalsContainer() {
  const [activeStatus, setActiveStatus] = useState('Todos')
  const [rentals, setRentals] = useState(rentalsMock)

  function handleChangeStatus(status: string) {
    setActiveStatus(status)

    if (status === 'Todos') {
      setRentals(rentalsMock)
      return
    }

    setRentals(rentalsMock.filter((rental) => rental.status === status))
  }

  return (
    <main>
      <Status
        activeStatus={activeStatus}
        onChangeStatus={handleChangeStatus}
        status={categories}
      />

      <Rentals rentals={rentals} />
    </main>
  )
}
