import { render, screen, setupMockServer, userEvent, waitFor } from 'lib/jest'
import { CreateBookForm } from '../CreateBookForm'
import { faker } from '@faker-js/faker'
import { createBookApiHandler } from 'mocks/books-api-handler'

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

setupMockServer(createBookApiHandler)

describe('<CreateBookForm />', () => {
  const user = userEvent.setup()

  it('shows the create book form', () => {
    render(<CreateBookForm />)
    expect(screen.getByLabelText('Title')).toBeInTheDocument()
    expect(screen.getByLabelText('Description')).toBeInTheDocument()
    expect(screen.getByLabelText('Image')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
  })

  it('shows a field error message for required fields', async () => {
    render(<CreateBookForm />)

    await user.click(screen.getByRole('button', { name: 'Submit' }))

    const [title, description, image] = await screen.findAllByRole('presentation', {
      name: 'error-field-message'
    })

    expect(title).toHaveTextContent('Title is required.')
    expect(description).toHaveTextContent('Description is required.')
    expect(image).toHaveTextContent('Image is required.')
  })

  it('Successfully submits book data', async () => {
    render(<CreateBookForm />)

    // enter credentials
    const password = faker.internet.password()
    await user.type(screen.getByLabelText('Title'), faker.internet.userName())
    await user.type(screen.getByLabelText('Description'), password)
    await user.type(screen.getByLabelText('Image'), password)
    await user.click(screen.getByRole('button', { name: 'Submit' }))

    // expect loading indicator
    expect(screen.getByRole('presentation', { name: 'button-loading' })).toHaveTextContent(
      'Submitting...'
    )
  })
})
