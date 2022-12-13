'use client'

import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

type AuthContextProps = {
  children: React.ReactNode
}

const queryClient = new QueryClient()

export default function ContextProviders({ children }: AuthContextProps) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}></QueryClientProvider>
      {children}
    </SessionProvider>
  )
}