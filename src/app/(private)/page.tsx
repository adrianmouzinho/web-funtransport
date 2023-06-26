import { Rentals } from '@/components/Rentals'
import { Header } from '@/components/Header'

export default function Home() {
  return (
    <div>
      <Header title="Aluguéis" />

      <Rentals />
    </div>
  )
}
