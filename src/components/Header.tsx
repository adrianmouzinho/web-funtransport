import { Bell, LogOut, User } from 'lucide-react'
// import cookie from 'js-cookie'

export function Header() {
  // function logout() {
  //   cookie.remove('token', { path: '/', expires: 0 })
  // }

  return (
    <div className="flex items-center justify-between bg-zinc-50 p-4">
      <strong>Aluguéis</strong>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="flex flex-col text-right text-[0.625rem]">
            Bem vindo(a)
            <span className="text-xs">Adrian Mouzinho</span>
          </div>

          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-600 bg-zinc-300">
            <User className="h-4 w-4" />
          </div>
        </div>

        <span className="cursor-pointer rounded-md border border-zinc-300 bg-white p-1">
          <Bell className="h-4 w-4" />
        </span>

        <a
          href="/api/auth/logout"
          className="cursor-pointer rounded-md border border-zinc-300 bg-white p-1"
        >
          <LogOut className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}
