'use client'

import { BookCard } from 'components/cards/BookCard'
import { useListBooksQuery } from 'hooks/useListBooksQuery'
import type { ListBooksType } from 'services/books'

type FeaturedBooksProps = {
  books: ListBooksType
}

// TODO: Add loading indicators

export const FeaturedBooks: React.FC<FeaturedBooksProps> = ({ books }) => {
  const { data, fetchNextPage } = useListBooksQuery(books)

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
