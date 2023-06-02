interface StatusProps {
  status: {
    id: number
    name: string
  }[]
  onChangeStatus: (status: string) => void
  activeStatus: string
}

export function Status({ status, onChangeStatus, activeStatus }: StatusProps) {
  return (
    <div className="flex items-center gap-3 p-4 text-sm">
      <button
        onClick={() => onChangeStatus('Todos')}
        className={`rounded-full px-3 py-1 transition-all ${
          activeStatus === 'Todos' && 'bg-orange-500 text-white'
        }`}
      >
        Todos
      </button>
      {status.map((status) => {
        return (
          <button
            key={status.id}
            onClick={() => onChangeStatus(status.name)}
            className={`rounded-full px-3 py-1 transition-all ${
              status.name === activeStatus && 'bg-orange-500 text-white'
            }`}
          >
            {status.name}
          </button>
        )
      })}
    </div>
  )
}
