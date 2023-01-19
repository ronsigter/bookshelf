import { Session } from 'next-auth'
import { redirect } from 'next/navigation'
import { headers } from './utils'
import type { Book } from './books'

const REST_SERVER = process.env.REST_SERVER || ''

type Pagination = {
  pagination: {
    total_pages: number
    next_page: number | null
    prev_page: number | null
    current_page: number
  }
}

export type ListMyBooksType = {
  data: Book[]
  meta: Pagination
}

type Params = {
  page?: number
  search?: string
}

type ListMyBooks = (session: Session | null, params?: Params) => Promise<ListMyBooksType>

const defaultParameters: Params = {
  page: 1,
  search: '*'
}

export const listMyBooks: ListMyBooks = async (session, params = defaultParameters) => {
  if (!session) redirect('/login')

  // ? https://github.com/microsoft/TypeScript/issues/32951
  const queryParams = new URLSearchParams(params as any).toString()

  const response = await fetch(`${REST_SERVER}/api/v1/my_books?` + queryParams, {
    method: 'GET',
    headers: headers(session.accessToken)
  })

  if (!response.ok) throw new Error(response.statusText)

  const data = await response.json()

  return data
}
