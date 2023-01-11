'use client'

import { BookCard } from 'components/cards/BookCard'
import { useListBooksQuery } from 'hooks/useListBooksQuery'
import { useReadingListActions } from 'hooks/useReadingListActions'
import type { ListBooksType, ReadingListStatus } from 'services/books'

type FeaturedBooksProps = {
  books: ListBooksType
}

// TODO: Add loading indicators

export const FeaturedBooks: React.FC<FeaturedBooksProps> = ({ books }) => {
  const { data, fetchNextPage, hasNextPage } = useListBooksQuery(books)
  const { addToReadingList, removeFromReadingList, updateReadingListStatus } =
    useReadingListActions()

  const handleUpdateStatus = (reading_list_id: string, status: ReadingListStatus) => {
    updateReadingListStatus({ reading_list_id, status })
  }

  const handleAddToList = (book_id: string) => {
    addToReadingList({ book_id })
  }

  const handleRemoveFromList = (reading_list_id: string) => {
    removeFromReadingList({ reading_list_id })
  }

  const actions = {
    onClickAddToList: handleAddToList,
    onClickRemoveFromList: handleRemoveFromList,
    onClickUpdateStatus: handleUpdateStatus
  }

  return (
    <div>
      <h3 className="mb-4 text-white">Featured books</h3>
      <div className="flex flex-wrap gap-4">
        {data?.pages?.map((page) =>
          page.data.map((book) => <BookCard key={book.id} book={book} actions={actions} />)
        )}
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
