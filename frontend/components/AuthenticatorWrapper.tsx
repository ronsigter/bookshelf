// ? Wrap a page-layout for authentication

import { unstable_getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from 'pages/api/auth/[...nextauth]'

export default async function AuthenthicatorWrapper({ children }: { children: React.ReactNode }) {
  const session = await unstable_getServerSession(authOptions)
  if (!session) redirect('/login')

  return <>{children}</>
}
