import Image from 'next/image'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { SignInForm } from '@/components/SignInForm'
import logo from '@/assets/logo.svg'

export default function SignIn() {
  const isAuthenticated = cookies().has('token')

  if (isAuthenticated) {
    return redirect('/')
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-8 rounded-lg border border-zinc-200 bg-zinc-50 px-10 py-12">
        <Image src={logo} alt="Logo da Funtransport" className="mx-auto" />

        <div className="space-y-4 text-center">
          <h2 className="text-xl font-semibold">
            Bem-vindo(a) à Área de Atendentes
          </h2>
          <span className="text-xs text-zinc-500">
            Entre para ter acesso a sua conta
          </span>
        </div>

        <SignInForm />
      </div>
    </div>
  )
}
