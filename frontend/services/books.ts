import { cookies } from 'next/headers'

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
  const nextCookies = cookies()
  const token = nextCookies.get('token')?.value

  const response = await fetch(`${REST_SERVER}/api/v1/books`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`
    },
    next: {
      revalidate: 10
    }
  })

  if (!response.ok) throw new Error(response.statusText)

  const { data } = await response.json()

  return data
}
