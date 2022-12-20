import { Session } from 'next-auth'
import { redirect } from 'next/navigation'

const REST_SERVER = process.env.REST_SERVER || ''

export type ReadingListStatus = 'unread' | 'finished' | null

export type Book = {
  id: string
  type: 'book'
  attributes: {
    id: string
    title: string
    description: string
    image?: {
      url?: string
    }
    reading_status: ReadingListStatus
  }
}

type Pagination = {
  pagination: {
    total_pages: number
    next_page: number | null
    prev_page: number | null
    current_page: number
  }
}

export type ListBooksType = {
  data: Book[]
  meta: Pagination
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

  const data = await response.json()

  return data
}
