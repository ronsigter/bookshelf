import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { listMyBooks, ListMyBooksType } from 'services/my-books'

export const useListMyBooksQuery = (initialData: ListMyBooksType) => {
  const queryClient = useQueryClient()
  const { data: session } = useSession()
  const query = useInfiniteQuery({
    queryKey: ['my_books'],
    queryFn: async ({ pageParam = 1 }) => {
      const search = queryClient.getQueryData<string>(['searchTerm']) || '*'

      const books = await listMyBooks(session, { page: pageParam, search })
      return books
    },
    getNextPageParam: ({ meta }) => meta?.pagination.next_page,
    initialData: {
      pages: [initialData],
      pageParams: [undefined]
    }
  })

  return query
}
