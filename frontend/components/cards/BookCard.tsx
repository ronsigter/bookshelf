import Image from 'next/image'
import React from 'react'
import { FaPlusCircle, FaMinusCircle, FaCheckCircle, FaBook } from 'react-icons/fa'
import type { Book } from 'services/books'

type BookCardProps = {
  book: Book
}

type ReadingSelection = Book['attributes']['reading_status']

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { title, image, reading_status } = book.attributes
  const imageUrl = image?.url || ''

  // TODO: Add button click event
  const actionSelector = (status: ReadingSelection) => {
    if (!status) return <FaPlusCircle title="Add to list" />

    return (
      <>
        {status === 'finished' ? (
          <FaBook title="Mark as unread" />
        ) : (
          <FaCheckCircle title="Mark as read" />
        )}
        <FaMinusCircle title="Remove from list" />
      </>
    )
  }

  return (
    <div
      className="border-border group relative h-72 w-52 cursor-pointer overflow-hidden rounded-2xl border-4 bg-white transition-all duration-300 hover:scale-105"
      role="presentation"
      aria-label="book-card"
    >
      <Image src={imageUrl} alt={title} fill />
      <div className="absolute bottom-0 flex w-full translate-y-full items-center justify-center gap-10 bg-slate-900/60 px-3 py-4 text-white transition duration-500 ease-in-out group-hover:translate-y-0">
        {actionSelector(reading_status)}
      </div>
    </div>
  )
}
