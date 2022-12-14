'use client'

import type { Book } from 'services/books'

export const FeaturedBooks: React.FC<{ books: Book[] }> = ({ books }) => {
  return (
    <div>
      <div>Featured books</div>
      <div className="flex flex-wrap gap-4">
        {books.map(({ id, title }) => (
          <div
            key={id}
            className="border-border relative h-72 w-52 cursor-pointer rounded-2xl border-4 bg-white transition-all duration-300 hover:scale-105"
          >
            <div className="absolute">
              <p>{title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
