import type { Book } from 'services/books'

type BookCardProps = {
  book: Book
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { title } = book

  return (
    <div
      className="border-border relative h-72 w-52 cursor-pointer rounded-2xl border-4 bg-white transition-all duration-300 hover:scale-105"
      role="presentation"
      aria-label="book-card"
    >
      <div className="absolute bottom-0 py-4 px-2">
        <p>{title}</p>
      </div>
    </div>
  )
}
