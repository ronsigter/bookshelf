import { Session } from 'next-auth'
import { redirect } from 'next/navigation'
import { headers } from './utils'

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
    reading_list_id: string
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
  search?: string
}

type ListBooks = (session: Session | null, params?: Params) => Promise<ListBooksType>

const defaultParameters: Params = {
  page: 1,
  search: '*'
}

export const listBooks: ListBooks = async (session, params = defaultParameters) => {
  if (!session) redirect('/login')

  // ? https://github.com/microsoft/TypeScript/issues/32951
  const queryParams = new URLSearchParams(params as any).toString()

  const response = await fetch(`${REST_SERVER}/api/v1/books?` + queryParams, {
    method: 'GET',
    headers: headers(session.accessToken)
  })

  if (!response.ok) throw new Error(response.statusText)

  const data = await response.json()

  return data
}

type CreateBook = (
  session: Session | null,
  params: { title: string; description: string; image: FileList }
) => Promise<{ data: Book }>

export const createBook: CreateBook = async (session, params) => {
  if (!session) redirect('/login')

  const payload = new FormData()
  payload.append('book[title]', params.title)
  payload.append('book[description]', params.description)
  payload.append('book[image]', params.image[0])

  const response = await fetch(`${REST_SERVER}/api/v1/books`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `bearer ${session.accessToken}`
    },
    body: payload
  })

  if (!response.ok) throw new Error(response.statusText)

  const data = await response.json()

  return data
}
