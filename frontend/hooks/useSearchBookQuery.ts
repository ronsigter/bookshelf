import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { listBooks } from 'services/books'
import { listMyBooks } from 'services/my-books'
import useDebounce from './useDebounce'
import type { UseInfiniteQueryResult } from '@tanstack/react-query'
import type { Dispatch, SetStateAction } from 'react'

type UseSearchBookQuery = {
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  query: UseInfiniteQueryResult
}

// This hook will perform a search then updates the:
//  - IF page === '/dashboard "books" cache
//  - IF page === '/my-list "my_books" cache
// Since the page uses the cache, Updating the cache will trigger a rerender
// Thus showing the search results data

export const useSearchBookQuery = (): UseSearchBookQuery => {
  const [search, setSearch] = useState('*')
  const debouncedValue = useDebounce(search, 300)
  const pathname = usePathname()

  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const query = useInfiniteQuery({
    queryKey: ['search', debouncedValue],
    queryFn: async () => {
      // save searchTerm to cache
      queryClient.setQueryData(['searchTerm'], debouncedValue)

      if (pathname === '/dashboard') {
        const books = await listBooks(session, { search: debouncedValue || '*' })
        return books
      }

      if (pathname === '/my-list') {
        const books = await listMyBooks(session, { search: debouncedValue || '*' })
        return books
      }
    },
    onSuccess(data) {
      // udpate "books" cache from "useListBooksQuery"
      if (pathname === '/dashboard') queryClient.setQueryData(['books'], data)

      // udpate "my_books" cache from "useListMyBooksQuery"
      if (pathname === '/my-list') queryClient.setQueryData(['my_books'], data)
    }
  })

  return { search, setSearch, query }
}
