import { useState } from 'react'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { listBooks } from 'services/books'
import useDebounce from './useDebounce'
import type { UseInfiniteQueryResult } from '@tanstack/react-query'
import type { Dispatch, SetStateAction } from 'react'

type UseSearchBookQuery = {
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  query: UseInfiniteQueryResult
}

// This hook will perform a search then updates the "books" cache
// Since the Dashboard uses the "books" cache, Updating the cache will trigger a rerender
// Thus showing the search results data

export const useSearchBookQuery = (): UseSearchBookQuery => {
  const [search, setSearch] = useState('*')
  const debouncedValue = useDebounce(search, 300)

  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const query = useInfiniteQuery({
    queryKey: ['books', debouncedValue],
    queryFn: async () => {
      // save searchTerm to cache
      queryClient.setQueryData(['searchTerm'], debouncedValue)

      const books = await listBooks(session, { search: debouncedValue || '*' })
      return books
    },
    onSuccess(data) {
      // udpate "books" cache from "useListBooksQuery"
      queryClient.setQueryData(['books'], data)
    }
  })

  return { search, setSearch, query }
}
