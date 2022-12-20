import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { ReadingListStatus } from 'services/books'
import {
  addToReadingList,
  removeFromReadingList,
  updateReadingListStatus
} from 'services/reading-list'

export const useReadingListActions = () => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const add = useMutation({
    mutationFn: async (vars: { book_id: string }) => {
      const data = await addToReadingList(session, vars)
      return data
    },
    onSuccess: () => queryClient.invalidateQueries(['books'])
  })

  const remove = useMutation({
    mutationFn: async (vars: { reading_list_id: string }) => {
      const data = await removeFromReadingList(session, vars)
      return data
    },
    onSuccess: () => queryClient.invalidateQueries(['books'])
  })

  const update = useMutation({
    mutationFn: async (vars: { reading_list_id: string; status: ReadingListStatus }) => {
      const data = await updateReadingListStatus(session, vars)
      return data
    },
    onSuccess: () => queryClient.invalidateQueries(['books'])
  })

  return {
    isLoading: add.isLoading || remove.isLoading || update.isLoading,
    addToReadingList: add.mutate,
    removeFromReadingList: remove.mutate,
    updateReadingListStatus: update.mutate
  }
}
