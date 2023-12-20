import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/app/nav/Nav'
import AuthProvider from '@/contexts/AuthProvider'
import SocketProvider from '@/contexts/SocketProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SocketProvider>
          <AuthProvider>
            <Nav />
            {children}
          </AuthProvider>
        </SocketProvider>
      </body>
    </html>
  )
}
