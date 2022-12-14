import { headers } from 'next/headers'

const NEXTAUTH_URL = process.env.NEXTAUTH_URL || ''

export const getSession = async () => {
  const response = await fetch(`${NEXTAUTH_URL}/api/auth/session`, {
    headers: {
      cookie: headers().get('cookie') ?? ''
    }
  })

  if (!response?.ok) {
    return null
  }

  const session = await response.json()
  return Object.keys(session).length > 0 ? session : null
}
