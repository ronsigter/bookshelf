import {
  render,
  screen,
  userEvent,
  setupMockServer,
  waitFor,
  within,
  waitForElementToBeRemoved
} from 'lib/jest'
import { listBooksApiHandler } from 'mocks/books-api-handler'
import { db } from 'mocks/db'
import { addToReadingListApiHandler } from 'mocks/reading-lists-api-handler'
import { Book } from 'services/books'
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

setupMockServer([...addToReadingListApiHandler, ...listBooksApiHandler])

describe('<FeaturedBooks />', () => {
  const user = userEvent.setup()

  const books = Array.from({ length: 5 }).map(() => {
    const book = db.book.create({ reading_status: null })
    return {
      id: book.id,
      type: 'book' as const,
      attributes: book
    }
  })

  const meta = {
    pagination: {
      next_page: null,
      current_page: 1,
      prev_page: null,
      total_pages: 1
    }
  }

  it('renders the FeaturedBooks component', () => {
    render(
      <FeaturedBooks
        books={{
          data: books as Book[],
          meta
        }}
      />
    )
    expect(screen.getByRole('heading')).toHaveTextContent('Featured books')
    expect(screen.getAllByRole('presentation', { name: 'book-card' }).length).toBe(5)
  })

  it('updates the set of CTA button of <BookCard /> component when add-to-list action was clicked', async () => {
    render(
      <FeaturedBooks
        books={{
          data: books as Book[],
          meta
        }}
      />
    )

    const bookCards = () => screen.getAllByRole('presentation', { name: 'book-card' })

    // initial check
    expect(within(bookCards()[0]).getByTitle('Add to list')).toBeInTheDocument()
    expect(within(bookCards()[0]).queryByTitle('Mark as read')).toBeNull()
    expect(within(bookCards()[0]).queryByTitle('Remove from list')).toBeNull()

    // add the first book
    await user.click(within(bookCards()[0]).getByTitle('Add to list'))

    // expect new action buttons
    await waitForElementToBeRemoved(within(bookCards()[0]).queryByTitle('Add to list'))
    expect(within(bookCards()[0]).getByTitle('Mark as read')).toBeInTheDocument()
    expect(within(bookCards()[0]).getByTitle('Remove from list')).toBeInTheDocument()
  })
})
