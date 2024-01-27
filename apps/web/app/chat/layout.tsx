'use client'

import { Card } from "@/components/ui/card"
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/components/ui/skeleton'

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="mt-24 main-container text-black dark:text-white">
      {children}
    </div >
  )
}
