import { Users, ArrowDownUp } from 'lucide-react'

export function Sidebar() {
  return (
    <aside className="flex max-h-screen flex-col gap-4 bg-orange-500 p-4 text-white">
      <strong className="text-sm font-bold uppercase">FUNTRANSPORT</strong>

      <nav>
        <a
          href=""
          className="flex items-center gap-2 rounded-lg p-2 text-sm transition-colors hover:bg-orange-400 hover:font-medium"
        >
          <ArrowDownUp className="h-4 w-4" />
          Aluguéis
        </a>

        <a
          href=""
          className="flex items-center gap-2 rounded-lg p-2 text-sm transition-colors hover:bg-orange-400 hover:font-medium"
        >
          <Users className="h-4 w-4" />
          Clientes
        </a>
      </nav>
    </aside>
  )
}
