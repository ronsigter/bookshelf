import { unstable_getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from 'pages/api/auth/[...nextauth]'

const REST_SERVER = process.env.REST_SERVER || ''

export type Book = {
  id: string
  title: string
  description: string
}

export type ListBooksType = {
  items: Book[]
  pages: number
  current_page: number
}

export const listBooks = async (): Promise<ListBooksType> => {
  const session = await unstable_getServerSession(authOptions)
  if (!session) redirect('/login')

  const response = await fetch(`${REST_SERVER}/api/v1/books`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `bearer ${session.accessToken}`
    },
    next: {
      revalidate: 10
    }
  })

  if (!response.ok) throw new Error(response.statusText)

  const { data } = await response.json()

  return data
}
