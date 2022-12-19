import { Session } from 'next-auth'
import { unstable_getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from 'pages/api/auth/[...nextauth]'

const REST_SERVER = process.env.REST_SERVER || ''

export type Book = {
  id: string
  title: string
  description: string
  image?: {
    url?: string
  }
}

export type ListBooksType = {
  items: Book[]
  pages: number
  current_page: number
}

type Params = {
  page?: number
}

type ListBooks = (session: Session | null, params?: Params) => Promise<ListBooksType>

const defaultParameters: Params = {
  page: 1
}

export const listBooks: ListBooks = async (session, params = defaultParameters) => {
  const { page } = params
  if (!session) redirect('/login')

  const response = await fetch(`${REST_SERVER}/api/v1/books?page=${page}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `bearer ${session.accessToken}`
    }
  })

  if (!response.ok) throw new Error(response.statusText)

  const { data } = await response.json()

  return data
}
