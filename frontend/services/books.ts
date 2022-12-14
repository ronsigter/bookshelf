import { getSession } from './session'

const REST_SERVER = process.env.REST_SERVER || ''

type Book = {
  id: string
  title: string
  description: string
}

type ListBooksType = {
  items: Book[]
  pages: number
  current_page: number
}

export const listBooks = async (): Promise<ListBooksType> => {
  const session = await getSession()
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
