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
    getNextPageParam: ({ current_page, pages }) =>
      current_page < pages ? current_page + 1 : undefined,
    initialData: {
      pages: [initialData],
      pageParams: [undefined]
    }
  })

  return query
}
