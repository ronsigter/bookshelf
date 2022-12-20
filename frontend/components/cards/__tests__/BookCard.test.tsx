import { render, screen } from 'lib/jest'
import { db } from 'mocks/db'
import { BookCard } from '../BookCard'

describe('<BookCard />', () => {
  const book = db.book.create({
    title: 'Harry Potter'
  })

  it('renders the BookCard component', () => {
    render(
      <BookCard
        book={{
          attributes: book,
          id: book.id,
          type: 'book'
        }}
      />
    )
    expect(screen.getByRole('presentation', { name: 'book-card' })).toHaveTextContent(
      'Harry Potter'
    )
  })
})
