import { getUser } from '@/utils/getUser'
import { LogOut, User } from 'lucide-react'
import Image from 'next/image'

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  const { name, avatarUrl } = getUser()

  return (
    <div className="flex items-center justify-between bg-zinc-50 py-6 pr-8">
      <strong className="text-xl font-bold">{title}</strong>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <div className="flex flex-col text-right text-xs">
            Bem vindo(a)
            <span className="text-sm">{name}</span>
          </div>

          {avatarUrl ? (
            <Image
              src={avatarUrl}
              width={32}
              height={32}
              alt=""
              className="h-8 w-8 rounded-full"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-600 bg-zinc-200">
              <User className="h-4 w-4" />
            </div>
          )}
        </div>

        <a
          href="/api/auth/logout"
          title="Sair"
          className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 transition-colors hover:bg-zinc-200"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </a>
      </div>
    </div>
  )
}
