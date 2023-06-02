import { SignInForm } from '@/components/SignInForm'

export default function SignIn() {
  return (
    <div className="absolute left-0 top-0 h-screen w-screen bg-orange-500">
      <div className="flex h-full w-full items-center justify-center">
        <SignInForm />
      </div>
    </div>
  )
}
