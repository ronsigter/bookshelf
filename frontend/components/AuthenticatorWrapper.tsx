'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AuthenthicatorWrapper({ children }: { children: React.ReactNode }) {
  const session = useSession()
  const router = useRouter()

  if (session.status === 'loading') return <div>loading...</div>
  if (session.status === 'unauthenticated') {
    router.push('/login')
    return <div>Unauthorized!</div>
  }

  return <>{children}</>
}
