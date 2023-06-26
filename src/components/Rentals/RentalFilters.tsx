interface StatusProps {
  status: {
    id: number
    name: string
  }[]
  onChangeStatus: (status: string) => void
  activeStatus: string
}

export function RentalFilters({
  status,
  onChangeStatus,
  activeStatus,
}: StatusProps) {
  return (
    <div className="space-y-2">
      <span className="text-sm font-semibold">Filtros</span>

      <div className="flex items-center gap-2 text-sm">
        {status.map((status) => {
          return (
            <button
              key={status.id}
              onClick={() => onChangeStatus(status.name)}
              className={`rounded-md px-3 py-1 transition-all hover:bg-orange-100 hover:text-black ${
                status.name === activeStatus && 'bg-orange-500 text-white'
              }`}
            >
              {status.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
