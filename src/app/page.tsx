import { cookies } from 'next/headers'
import { RentalsContainer } from '@/components/RentalsContainer'
import { redirect } from 'next/navigation'
import { Header } from '@/components/Header'

export default function Home() {
  const isAuthenticated = cookies().get('token')?.value

  if (!isAuthenticated) {
    return redirect('/signIn')
  }

  return (
    <div>
      <Header title="Aluguéis" />

      <RentalsContainer />
    </div>
  )
}
