import { redirect } from 'next/navigation'
import { headers } from './utils'
import type { Session } from 'next-auth'
import type { ReadingListStatus } from './books'

const REST_SERVER = process.env.REST_SERVER || ''

export type ReadingList = {
  id: string
  user_id: string
  book_id: string
  status: ReadingListStatus
}

type AddToReadingList = (
  session: Session | null,
  params: { book_id: string }
) => Promise<{ data: ReadingList }>

export const addToReadingList: AddToReadingList = async (session, params) => {
  const { book_id } = params
  if (!session) redirect('/login')

  const payload = {
    reading_list: {
      book_id
    }
  }

  const response = await fetch(`${REST_SERVER}/api/v1/reading_lists`, {
    method: 'POST',
    headers: headers(session.accessToken),
    body: JSON.stringify(payload)
  })

  if (!response.ok) throw new Error(response.statusText)

  const data = await response.json()

  return data
}

type RemoveFromReadingList = (
  session: Session | null,
  params: { reading_list_id: string }
) => Promise<{ data: { message: string } }>

export const removeFromReadingList: RemoveFromReadingList = async (session, params) => {
  const { reading_list_id } = params
  if (!session) redirect('/login')

  const response = await fetch(`${REST_SERVER}/api/v1/reading_lists/${reading_list_id}`, {
    method: 'DELETE',
    headers: headers(session.accessToken)
  })

  if (!response.ok) throw new Error(response.statusText)

  const data = await response.json()

  return data
}

type UpdateReadingListStatus = (
  session: Session | null,
  params: { reading_list_id: string; status: ReadingListStatus }
) => Promise<{ data: ReadingList }>

export const updateReadingListStatus: UpdateReadingListStatus = async (session, params) => {
  const { reading_list_id, status } = params
  if (!session) redirect('/login')

  const payload = {
    reading_list: {
      status
    }
  }

  const response = await fetch(`${REST_SERVER}/api/v1/reading_lists/${reading_list_id}`, {
    method: 'PUT',
    headers: headers(session.accessToken),
    body: JSON.stringify(payload)
  })

  if (!response.ok) throw new Error(response.statusText)

  const data = await response.json()

  return data
}
