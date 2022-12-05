import { render, screen, userEvent, waitFor, waitForElementToBeRemoved } from 'lib/jest'
import { LoginForm } from '../LoginForm'
import { faker } from '@faker-js/faker'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
  rest.post('http://localhost:4000/api/login', async (req, res, ctx) => {
    const { login } = await req.json()
    if (login?.username === 'valid_user')
      return res(
        ctx.status(200),
        ctx.json({
          data: { token: 'header.payload.signature' }
        })
      )

    return res(
      ctx.status(401),
      ctx.json({
        errors: ['Unauthorized']
      })
    )
  })
)

beforeAll(() => {
  server.listen()
})
afterAll(() => {
  server.close()
})

const mockRouterPush = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: mockRouterPush
    }
  }
}))

describe('<LoginForm />', () => {
  const user = userEvent.setup()

  it('shows the login form', () => {
    render(<LoginForm />)
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument()
  })

  it('shows a field error message for required fields', async () => {
    render(<LoginForm />)

    user.click(screen.getByRole('button', { name: 'Sign In' }))

    const [username, password] = await screen.findAllByRole('presentation', {
      name: 'error-field-message'
    })

    expect(username).toHaveTextContent('Username is required.')
    expect(password).toHaveTextContent('Password is required.')
    expect(mockRouterPush).toBeCalledTimes(0)
  })

  it('shows an error message if invalid user', async () => {
    render(<LoginForm />)

    // enter credentials
    await user.type(screen.getByLabelText(/username/i), faker.internet.userName())
    await user.type(screen.getByLabelText(/password/i), faker.internet.password())
    await user.click(screen.getByRole('button', { name: 'Sign In' }))

    // expect loading indicator
    expect(screen.getByRole('presentation', { name: 'button-loading' })).toHaveTextContent(
      'Authenticating...'
    )
    await waitFor(() =>
      expect(screen.getByRole('presentation', { name: 'login-error' })).toHaveTextContent(
        "Sorry, we can't find an account with this username. Please try again."
      )
    )
    expect(mockRouterPush).toBeCalledTimes(0)
  })

  it('Routes to landing page if user is valid', async () => {
    render(<LoginForm />)

    // enter credentials
    await user.type(screen.getByLabelText(/username/i), 'valid_user')
    await user.type(screen.getByLabelText(/password/i), faker.internet.password())
    await user.click(screen.getByRole('button', { name: 'Sign In' }))

    // expect loading indicator
    expect(screen.getByRole('presentation', { name: 'button-loading' })).toHaveTextContent(
      'Authenticating...'
    )

    await waitFor(() => expect(mockRouterPush).toBeCalledWith('/'))
  })
})
