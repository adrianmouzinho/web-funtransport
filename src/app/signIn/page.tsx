import Image from 'next/image'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { SignInForm } from '@/components/SignInForm'
import logo from '@/assets/logo.svg'

export default function SignIn() {
  const isAuthenticated = cookies().get('token')?.value

  if (isAuthenticated) {
    return redirect('/')
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex w-full max-w-xs flex-col gap-8 rounded-lg bg-zinc-50 p-6">
        <Image src={logo} alt="Logo da Funtransport" className="mx-auto" />

        <h2 className="text-center font-semibold">Acesse a plataforma</h2>

        <SignInForm />
      </div>
    </div>
  )
}
