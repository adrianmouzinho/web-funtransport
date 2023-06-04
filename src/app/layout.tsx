import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { Sidebar } from '@/components/Sidebar'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata = {
  title: 'Funtransport',
  description: 'Gerencie suas reservadas de patins, skates e patinetes',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-50`}>
        <div className="grid min-h-screen w-screen grid-cols-[304px_auto]">
          <Sidebar />

          {children}
        </div>
      </body>
    </html>
  )
}
