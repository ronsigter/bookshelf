import { headers } from 'next/headers'
import type { Session } from 'next-auth'

const NEXTAUTH_URL = process.env.NEXTAUTH_URL || ''

export const getSession = async (): Promise<Session> => {
  const response = await fetch(`${NEXTAUTH_URL}/api/auth/session`, {
    headers: {
      cookie: headers().get('cookie') ?? ''
    }
  })

  if (!response?.ok) throw new Error(response.statusText)

  const session: Session = await response.json()

  if (!(Object.keys(session).length > 0)) throw new Error('Unauthorized')

  return session
}
