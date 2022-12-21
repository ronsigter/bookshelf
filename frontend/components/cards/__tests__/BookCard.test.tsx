import { render, screen, userEvent } from 'lib/jest'
import { db } from 'mocks/db'
import { BookCard } from '../BookCard'

describe('<BookCard />', () => {
  const user = userEvent.setup()
  const book = db.book.create()
  const mockHandleAddToList = jest.fn()
  const mockHandleRemoveFromList = jest.fn()
  const mockHandleUpdateStatus = jest.fn()

  const actions = {
    onClickAddToList: mockHandleAddToList,
    onClickRemoveFromList: mockHandleRemoveFromList,
    onClickUpdateStatus: mockHandleUpdateStatus
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the "Add to list" icon if status is "null"', async () => {
    render(
      <BookCard
        book={{
          attributes: { ...book, reading_status: null },
          id: book.id,
          type: 'book'
        }}
        actions={actions}
      />
    )
    await user.click(screen.getByTitle('Add to list'))
    expect(mockHandleAddToList).toBeCalledWith(book.id)
    expect(mockHandleRemoveFromList).toBeCalledTimes(0)
    expect(mockHandleUpdateStatus).toBeCalledTimes(0)
  })

  it('renders both "Mark as unread" and "Remove from lust" icon if status is "unread"', async () => {
    render(
      <BookCard
        book={{
          attributes: { ...book, reading_status: 'unread' },
          id: book.id,
          type: 'book'
        }}
        actions={actions}
      />
    )
    await user.click(screen.getByTitle('Mark as read'))
    await user.click(screen.getByTitle('Remove from list'))

    expect(mockHandleRemoveFromList).toBeCalledWith(book.reading_list_id)
    expect(mockHandleUpdateStatus).toBeCalledWith(book.reading_list_id, 'finished')
    expect(mockHandleAddToList).toBeCalledTimes(0)
  })

  it('renders both "Mark as unread" and "Remove from lust" icon if status is "finished"', async () => {
    render(
      <BookCard
        book={{
          attributes: { ...book, reading_status: 'finished' },
          id: book.id,
          type: 'book'
        }}
        actions={actions}
      />
    )
    await user.click(screen.getByTitle('Mark as unread'))
    await user.click(screen.getByTitle('Remove from list'))

    expect(mockHandleRemoveFromList).toBeCalledWith(book.reading_list_id)
    expect(mockHandleUpdateStatus).toBeCalledWith(book.reading_list_id, 'unread')
    expect(mockHandleAddToList).toBeCalledTimes(0)
  })
})
