import { headers } from 'next/headers'

export const getSession = async () => {
  const response = await fetch('http://localhost:3000/api/auth/session', {
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
