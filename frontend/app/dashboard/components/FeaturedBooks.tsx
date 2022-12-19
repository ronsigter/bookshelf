'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { BookCard } from 'components/cards/BookCard'
import { useSession } from 'next-auth/react'
import { listBooks, ListBooksType } from 'services/books'

type FeaturedBooksProps = {
  books: ListBooksType
}

// TODO: Add loading indicators

export const FeaturedBooks: React.FC<FeaturedBooksProps> = ({ books }) => {
  const { data: session } = useSession()
  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['books'],
    queryFn: async ({ pageParam = 1 }) => {
      const books = await listBooks(session, { page: pageParam })
      return books
    },
    getNextPageParam: ({ current_page, pages }) =>
      current_page < pages ? current_page + 1 : undefined,
    initialData: {
      pages: [books],
      pageParams: [undefined]
    }
  })

  return (
    <div>
      <h3 className="mb-4 text-white">Featured books</h3>
      <div className="flex flex-wrap gap-4">
        {data?.pages.map((page) =>
          page.items.map((book) => <BookCard key={book.id} book={book} />)
        )}
      </div>
      <button onClick={() => fetchNextPage()}>More</button>
    </div>
  )
}
