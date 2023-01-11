import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { listBooks, ListBooksType } from 'services/books'

export const useListBooksQuery = (initialData: ListBooksType) => {
  const queryClient = useQueryClient()
  const { data: session } = useSession()
  const query = useInfiniteQuery({
    queryKey: ['books'],
    queryFn: async ({ pageParam = 1 }) => {
      const search = queryClient.getQueryData<string>(['searchTerm']) || '*'

      const books = await listBooks(session, { page: pageParam, search })
      return books
    },
    getNextPageParam: ({ meta }) => meta.pagination.next_page,
    initialData: {
      pages: [initialData],
      pageParams: [undefined]
    }
  })

  return query
}
