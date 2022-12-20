import { redirect } from 'next/navigation'
import type { Session } from 'next-auth'
import type { ReadingListStatus } from './books'

const REST_SERVER = process.env.REST_SERVER || ''

type AddToReadingList = (session: Session | null, params: { book_id: string }) => Promise<void>

const headers = (token: string): HeadersInit => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `bearer ${token}`
})

export const addToReadingList: AddToReadingList = async (session, params) => {
  const { book_id } = params
  if (!session) redirect('/login')

  const response = await fetch(`${REST_SERVER}/api/v1/reading_lists`, {
    method: 'POST',
    headers: headers(session.accessToken),
    body: JSON.stringify({
      reading_list: {
        book_id
      }
    })
  })

  if (!response.ok) throw new Error(response.statusText)

  const data = await response.json()

  return data
}

type RemoveFromReadingList = (session: Session | null, params: { book_id: string }) => Promise<void>

export const removeFromReadingList: RemoveFromReadingList = async (session, params) => {
  const { book_id } = params
  if (!session) redirect('/login')

  const response = await fetch(`${REST_SERVER}/api/v1/reading_lists/${book_id}`, {
    method: 'DELETE',
    headers: headers(session.accessToken)
  })

  if (!response.ok) throw new Error(response.statusText)

  const data = await response.json()

  return data
}

type UpdateReadingListStatus = (
  session: Session | null,
  params: { book_id: string; status: ReadingListStatus }
) => Promise<void>

export const updateReadingListStatus: UpdateReadingListStatus = async (session, params) => {
  const { book_id, status } = params
  if (!session) redirect('/login')

  const response = await fetch(`${REST_SERVER}/api/v1/reading_lists/${book_id}`, {
    method: 'PUT',
    headers: headers(session.accessToken),
    body: JSON.stringify({
      reading_list: {
        status
      }
    })
  })

  if (!response.ok) throw new Error(response.statusText)

  const data = await response.json()

  return data
}
