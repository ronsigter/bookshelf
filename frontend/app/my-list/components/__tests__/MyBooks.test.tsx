import {
  render,
  screen,
  userEvent,
  setupMockServer,
  within,
  waitForElementToBeRemoved
} from 'lib/jest'
import { listMyBooksApiHandler } from 'mocks/my-books-api-handler'
import { db } from 'mocks/db'
import {
  addToReadingListApiHandler,
  removeFromReadingListApiHandler,
  updateReadingListApiHandler
} from 'mocks/reading-lists-api-handler'
import { Book } from 'services/books'
import { MyBooks } from '../MyBooks'

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

setupMockServer([
  ...listMyBooksApiHandler,
  ...addToReadingListApiHandler,
  ...updateReadingListApiHandler,
  ...removeFromReadingListApiHandler
])

describe('<MyBooks />', () => {
  const user = userEvent.setup()

  const books = Array.from({ length: 5 }).map(() => {
    const book = db.book.create({ reading_status: 'unread' })
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

  it('renders the MyBooks component', () => {
    render(
      <MyBooks
        books={{
          data: books as Book[],
          meta
        }}
      />
    )
    expect(screen.getByRole('heading')).toHaveTextContent('My books')
    expect(screen.getAllByRole('presentation', { name: 'book-card' }).length).toBe(5)
  })

  it('updates the set of CTA button of <BookCard /> component when an action was clicked', async () => {
    render(
      <MyBooks
        books={{
          data: books as Book[],
          meta
        }}
      />
    )

    const bookCards = () => screen.getAllByRole('presentation', { name: 'book-card' })

    // initial check
    expect(bookCards().length).toBe(5)
    expect(within(bookCards()[0]).getByTitle('Mark as read')).toBeInTheDocument()
    expect(within(bookCards()[0]).getByTitle('Remove from list')).toBeInTheDocument()
    expect(within(bookCards()[0]).queryByTitle('Mark as unread')).toBeNull()

    // mark as read the first book
    await user.click(within(bookCards()[0]).getByTitle('Mark as read'))
    await waitForElementToBeRemoved(within(bookCards()[0]).queryByTitle('Mark as read'))
    expect(bookCards().length).toBe(5)
    expect(within(bookCards()[0]).getByTitle('Mark as unread')).toBeInTheDocument()
    expect(within(bookCards()[0]).getByTitle('Remove from list')).toBeInTheDocument()

    // mark as unread the first book
    await user.click(within(bookCards()[0]).getByTitle('Mark as unread'))
    await waitForElementToBeRemoved(within(bookCards()[0]).queryByTitle('Mark as unread'))
    expect(bookCards().length).toBe(5)
    expect(within(bookCards()[0]).getByTitle('Mark as read')).toBeInTheDocument()
    expect(within(bookCards()[0]).getByTitle('Remove from list')).toBeInTheDocument()

    // remove the first book
    await user.click(within(bookCards()[0]).getByTitle('Remove from list'))
    await waitForElementToBeRemoved(within(bookCards()[0]).queryByTitle('Remove from list'))
    expect(bookCards().length).toBe(4)
  })
})
