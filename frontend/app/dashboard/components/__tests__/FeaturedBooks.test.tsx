import { render, screen } from 'lib/jest'
import { db } from 'mocks/db'
import { FeaturedBooks } from '../FeaturedBooks'

jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react')
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: 'tester' }
  }
  return {
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: 'authenticated' } // return type is [] in v3 but changed to {} in v4
    })
  }
})

describe('<FeaturedBooks />', () => {
  const books = Array.from({ length: 5 }).map(() => {
    const book = db.book.create()
    return {
      id: book.id,
      type: 'book' as const,
      attributes: book
    }
  })
  const meta = {
    pagination: {
      next_page: 2,
      current_page: 1,
      prev_page: null,
      total_pages: 4
    }
  }
  it('renders the FeaturedBooks component', () => {
    render(
      <FeaturedBooks
        books={{
          data: books,
          meta
        }}
      />
    )
    expect(screen.getByRole('heading')).toHaveTextContent('Featured books')
    expect(screen.getAllByRole('presentation', { name: 'book-card' }).length).toBe(5)
  })
})
