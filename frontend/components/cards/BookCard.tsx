import Image from 'next/image'
import type { Book } from 'services/books'

type BookCardProps = {
  book: Book
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { title, image } = book.attributes
  const imageUrl = image?.url || ''

  return (
    <div
      className="border-border group relative h-72 w-52 cursor-pointer overflow-hidden rounded-2xl border-4 bg-white transition-all duration-300 hover:scale-105"
      role="presentation"
      aria-label="book-card"
    >
      <Image src={imageUrl} alt={title} fill />
      <div className=" absolute bottom-0 w-full translate-y-full bg-slate-900/70 px-3 py-4 transition duration-500 ease-in-out group-hover:translate-y-0">
        <p className="truncate text-white">{title}</p>
      </div>
    </div>
  )
}
