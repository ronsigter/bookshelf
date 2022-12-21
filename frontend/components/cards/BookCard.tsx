'use client'

import Image from 'next/image'
import React from 'react'
import { FaPlusCircle, FaMinusCircle, FaCheckCircle, FaBook } from 'react-icons/fa'
import type { Book, ReadingListStatus } from 'services/books'

type BookCardProps = {
  book: Book
  actions: {
    onClickAddToList: (book_id: string) => void
    onClickUpdateStatus: (readingListId: string, status: ReadingListStatus) => void
    onClickRemoveFromList: (readingListId: string) => void
  }
}

export const BookCard: React.FC<BookCardProps> = ({ book, actions }) => {
  const { title, image, reading_status, reading_list_id } = book.attributes
  const { onClickAddToList, onClickUpdateStatus, onClickRemoveFromList } = actions
  const imageUrl = image?.url || ''

  const actionSelector = (status: ReadingListStatus) => {
    if (!status)
      return (
        <FaPlusCircle
          onClick={() => onClickAddToList(book.id)}
          title="Add to list"
          className="transition-all duration-200 hover:text-cyan-400"
        />
      )

    return (
      <>
        {status === 'finished' ? (
          <FaBook
            onClick={() => onClickUpdateStatus(reading_list_id, 'unread')}
            title="Mark as unread"
            className="transition-all duration-200 hover:text-amber-400"
          />
        ) : (
          <FaCheckCircle
            onClick={() => onClickUpdateStatus(reading_list_id, 'finished')}
            title="Mark as read"
            className="transition-all duration-200 hover:text-emerald-400"
          />
        )}
        <FaMinusCircle
          onClick={() => onClickRemoveFromList(reading_list_id)}
          title="Remove from list"
          className="transition-all duration-200 hover:text-red-400"
        />
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
