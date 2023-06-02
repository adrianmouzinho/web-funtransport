import { User } from 'lucide-react'

type RentalsProps = {
  rentals: {
    id: number
    customerName: string
    status: string
    duration: number
    customerEmail: string
  }[]
}

export function Rentals({ rentals }: RentalsProps) {
  return (
    <div className="rounded-lg px-4 text-sm">
      <div className="grid grid-cols-[auto_160px_160px] bg-zinc-200 p-3 text-zinc-600">
        <span>Nome do cliente</span>
        <span>Duração</span>
        <span>Status</span>
      </div>

      <ul className="flex flex-col gap-4 bg-zinc-50 p-4">
        {rentals.map((rental) => {
          return (
            <li key={rental.id} className="grid grid-cols-[auto_160px_160px]">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-zinc-600 bg-zinc-300">
                  <User className="h-4 w-4" />
                </div>

                <div className="flex flex-col text-xs font-medium">
                  {rental.customerName}
                  <span className="text-[0.625rem] font-normal">
                    {rental.customerEmail}
                  </span>
                </div>
              </div>

              <span>{rental.duration} minutos</span>

              <span
                className={`flex h-fit w-fit items-center justify-center rounded-full px-2 py-1 text-xs ${
                  rental.status === 'Ativo'
                    ? 'bg-emerald-100 text-emerald-500'
                    : rental.status === 'Cancelado'
                    ? 'bg-red-100 text-red-500'
                    : rental.status === 'Pendente'
                    ? 'bg-yellow-100 text-yellow-500'
                    : 'bg-blue-100 text-blue-500'
                }`}
              >
                {rental.status}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
