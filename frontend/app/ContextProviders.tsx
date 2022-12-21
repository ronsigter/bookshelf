'use client'

// ? Context cannot be created within the Server Components
// ? https://beta.nextjs.org/docs/rendering/server-and-client-components#context

import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

type AuthContextProps = {
  children: React.ReactNode
}

export default function ContextProviders({ children }: AuthContextProps) {
  // This ensures that data is not shared
  // between different users and requests
  const [queryClient] = useState(() => new QueryClient())

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  )
}
