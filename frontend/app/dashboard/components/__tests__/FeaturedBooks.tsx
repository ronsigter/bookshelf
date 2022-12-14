import { render, screen } from 'lib/jest'
import { db } from 'mocks/db'
import { FeaturedBooks } from '../FeaturedBooks'

describe('<FeaturedBooks />', () => {
  const books = Array.from({ length: 5 }).map(() => db.book.create())

  it('renders the FeaturedBooks component', () => {
    render(<FeaturedBooks books={books} />)
    expect(screen.getByRole('heading')).toHaveTextContent('Featured books')
    expect(screen.getAllByRole('presentation', { name: 'book-card' }).length).toBe(5)
  })
})
