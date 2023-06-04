import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Header } from '@/components/Header'
import { Customers as CustomersContainer } from '@/components/Customers'

export default async function Customers() {
  const isAuthenticated = cookies().get('token')?.value

  if (!isAuthenticated) {
    return redirect('/signIn')
  }

  return (
    <div>
      <Header title="Clientes" />

      <CustomersContainer />
    </div>
  )
}
