import { useInfiniteQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { listBooks, ListBooksType } from 'services/books'

export const useListBooksQuery = (initialData: ListBooksType) => {
  const { data: session } = useSession()
  const query = useInfiniteQuery({
    queryKey: ['books'],
    queryFn: async ({ pageParam = 1 }) => {
      const books = await listBooks(session, { page: pageParam })
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
