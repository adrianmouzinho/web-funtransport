import { formatDate } from '@/lib/formatDate'
import { formatPrice } from '@/lib/formatPrice'
import dayjs from 'dayjs'

type RentalsProps = {
  rentals: {
    id: string
    code: string
    createdAt: string
    status: string
    duration: number
    price: number
  }[]
}

export function Rentals({ rentals }: RentalsProps) {
  return (
    <div className="rounded-lg border border-zinc-200 p-4">
      <table className="min-w-full table-auto p-8 text-sm">
        <thead>
          <tr className="text-xs text-zinc-600">
            <th className="px-4 py-2 text-left uppercase">Código</th>
            <th className="px-4 py-2 text-left uppercase">Duração</th>
            <th className="px-4 py-2 text-left uppercase">Valor</th>
            <th className="px-4 py-2 text-left uppercase">
              Horário da retirada
            </th>
            <th className="px-4 py-2 text-left uppercase">
              Previsão da devolução
            </th>
            <th className="px-4 py-2 text-left uppercase">Status</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((rental) => (
            <tr key={rental.id}>
              <td className=" px-4 py-2 text-left">{rental.code}</td>
              <td className=" px-4 py-2 text-left">{rental.duration} min</td>
              <td className=" px-4 py-2 text-left">
                {formatPrice(rental.price / 100)}
              </td>
              <td className=" px-4 py-2 text-left">
                {rental.status === 'Pendente'
                  ? 'Aguardando retirada'
                  : formatDate(rental.createdAt)}
              </td>
              <td className=" px-4 py-2 text-left">
                {rental.status === 'Pendente'
                  ? 'Aguardando retirada'
                  : formatDate(
                      dayjs(rental.createdAt)
                        .add(rental.duration, 'minute')
                        .toISOString(),
                    )}
              </td>
              <td className=" px-4 py-2 text-left">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
