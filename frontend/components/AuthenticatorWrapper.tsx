'use client'

// ? Wrap a page-layout for authentication
// ? This is a Client side authentication using next-auth's session to check if user is authenticated

// TODO: Add loading indicator component
// TODO: Add Unauthorized component

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
