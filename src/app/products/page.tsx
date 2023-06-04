import { Header } from '@/components/Header'
import { Products as ProductsContainer } from '@/components/Products'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function Products() {
  const isAuthenticated = cookies().get('token')?.value

  if (!isAuthenticated) {
    return redirect('/signIn')
  }
  return (
    <div>
      <Header title="Equipamentos" />

      <ProductsContainer />
    </div>
  )
}
