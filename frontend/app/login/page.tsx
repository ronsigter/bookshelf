'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Image from 'next/image'
import { LoginForm } from './components/LoginForm'

const queryClient = new QueryClient()

export default function LoginPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-background flex h-screen w-full justify-center">
        <div className="flex w-full max-w-sm flex-col items-center justify-center px-4">
          <div className="py-5">
            <Image width={200} height={200} alt="bookney-logo" src="/bookney-light.png" />
          </div>
          <LoginForm />
        </div>
      </div>
    </QueryClientProvider>
  )
}
