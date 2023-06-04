import Image from 'next/image'
import { SignInForm } from '@/components/SignInForm'
import logo from '@/assets/logo.svg'

export default function SignIn() {
  return (
    <div className="absolute left-0 top-0 h-screen w-screen bg-zinc-50">
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex w-full max-w-xs flex-col gap-8 rounded-lg bg-zinc-50 p-6">
          <Image src={logo} alt="Logo da Funtransport" className="mx-auto" />

          <h2 className="text-center font-semibold">Acesse a plataforma</h2>

          <SignInForm />
        </div>
      </div>
    </div>
  )
}
