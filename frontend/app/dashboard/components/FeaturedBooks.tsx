import { BookCard } from 'components/cards/BookCard'
import type { Book } from 'services/books'

type FeaturedBooksProps = {
  books: Book[]
}

export const FeaturedBooks: React.FC<FeaturedBooksProps> = ({ books }) => {
  return (
    <div>
      <h3 className="mb-4 text-white">Featured books</h3>
      <div className="flex flex-wrap gap-4">
        {books.map((book) => {
          console.log(book)
          return <BookCard key={book.id} book={book} />
        })}
      </div>
    </div>
  )
}
