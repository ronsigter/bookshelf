import { render, screen } from 'lib/jest'
import { db } from 'mocks/db'
import { BookCard } from '../BookCard'

describe('<BookCard />', () => {
  const book = db.book.create()

  it('renders the "Add to list" icon if status is "null"', () => {
    render(
      <BookCard
        book={{
          attributes: { ...book, reading_status: null },
          id: book.id,
          type: 'book'
        }}
      />
    )
    expect(screen.getByTitle('Add to list')).toBeInTheDocument()
  })

  it('renders both "Mark as unread" and "Remove from lust" icon if status is "unread"', () => {
    render(
      <BookCard
        book={{
          attributes: { ...book, reading_status: 'unread' },
          id: book.id,
          type: 'book'
        }}
      />
    )
    expect(screen.getByTitle('Mark as read')).toBeInTheDocument()
    expect(screen.getByTitle('Remove from list')).toBeInTheDocument()
  })

  it('renders both "Mark as unread" and "Remove from lust" icon if status is "finished"', () => {
    render(
      <BookCard
        book={{
          attributes: { ...book, reading_status: 'finished' },
          id: book.id,
          type: 'book'
        }}
      />
    )
    expect(screen.getByTitle('Mark as unread')).toBeInTheDocument()
    expect(screen.getByTitle('Remove from list')).toBeInTheDocument()
  })
})
