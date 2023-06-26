import { Header } from '@/components/Header'
import { Customers } from '@/components/Customers'

export default async function CustomersRoute() {
  return (
    <div>
      <Header title="Clientes" />

      <Customers />
    </div>
  )
}
