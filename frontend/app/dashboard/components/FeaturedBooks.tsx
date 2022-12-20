'use client'

import { BookCard } from 'components/cards/BookCard'
import { useListBooksQuery } from 'hooks/useListBooksQuery'
import type { ListBooksType } from 'services/books'

type FeaturedBooksProps = {
  books: ListBooksType
}

// TODO: Add loading indicators

export const FeaturedBooks: React.FC<FeaturedBooksProps> = ({ books }) => {
  const { data, fetchNextPage, hasNextPage } = useListBooksQuery(books)

  return (
    <div>
      <h3 className="mb-4 text-white">Featured books</h3>
      <div className="flex flex-wrap gap-4">
        {data?.pages.map((page) => page.data.map((book) => <BookCard key={book.id} book={book} />))}
        {hasNextPage && (
          <div className="flex h-72 w-52 items-center justify-center">
            <button className="h-full w-full text-white" onClick={() => fetchNextPage()}>
              More
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
