import { render, screen } from 'lib/jest'
import { db } from 'mocks/db'
import { BookCard } from '../BookCard'

describe('<BookCard />', () => {
  const book = db.book.create()

  it('renders the add-book icon if status is null', () => {
    render(
      <BookCard
        book={{
          attributes: { ...book, reading_status: null },
          id: book.id,
          type: 'book'
        }}
      />
    )
    expect(screen.getByTitle('add-book')).toBeInTheDocument()
  })

  it('renders the add-book icon if status is null', () => {
    render(
      <BookCard
        book={{
          attributes: { ...book, reading_status: 'unread' },
          id: book.id,
          type: 'book'
        }}
      />
    )
    expect(screen.getByTitle('read-book')).toBeInTheDocument()
    expect(screen.getByTitle('remove-book')).toBeInTheDocument()
  })

  it('renders the add-book icon if status is null', () => {
    render(
      <BookCard
        book={{
          attributes: { ...book, reading_status: 'finished' },
          id: book.id,
          type: 'book'
        }}
      />
    )
    expect(screen.getByTitle('unread-book')).toBeInTheDocument()
    expect(screen.getByTitle('remove-book')).toBeInTheDocument()
  })
})
