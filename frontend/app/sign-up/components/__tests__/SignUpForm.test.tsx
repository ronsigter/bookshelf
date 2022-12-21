import { render, screen, setupMockServer, userEvent, waitFor } from 'lib/jest'
import { SignUpForm } from '../SignUpForm'
import { faker } from '@faker-js/faker'
import { db } from 'mocks/db'
import { registerApiHandler } from 'mocks/register-api-handler'

setupMockServer(registerApiHandler)

const mockRouterPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: mockRouterPush
    }
  }
}))

describe('<SignUpForm />', () => {
  const user = userEvent.setup()
  const userData = db.user.create()

  it('shows the signup form', () => {
    render(<SignUpForm />)
    expect(screen.getByLabelText('Username')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByLabelText('Confirm password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument()
  })

  it('shows a field error message for required fields', async () => {
    render(<SignUpForm />)

    user.click(screen.getByRole('button', { name: 'Sign up' }))

    const [username, password, passwordConfirm] = await screen.findAllByRole('presentation', {
      name: 'error-field-message'
    })

    expect(username).toHaveTextContent('Username is required.')
    expect(password).toHaveTextContent('Password is required.')
    expect(passwordConfirm).toHaveTextContent('Password confirmation is required.')
    expect(mockRouterPush).toBeCalledTimes(0)
  })

  it('shows an error message if passwords do not match', async () => {
    render(<SignUpForm />)

    // enter credentials
    await user.type(screen.getByLabelText('Username'), faker.internet.userName())
    await user.type(screen.getByLabelText('Password'), faker.internet.password())
    await user.type(screen.getByLabelText('Confirm password'), faker.internet.password())
    await user.click(screen.getByRole('button', { name: 'Sign up' }))

    // expect loading indicator
    const [passwordConfirm] = await screen.findAllByRole('presentation', {
      name: 'error-field-message'
    })

    expect(passwordConfirm).toHaveTextContent('Your passwords do no match.')
    expect(mockRouterPush).toBeCalledTimes(0)
  })

  it('shows an error message if username already exists', async () => {
    render(<SignUpForm />)

    // enter credentials
    await user.type(screen.getByLabelText('Username'), userData.username)
    await user.type(screen.getByLabelText('Password'), userData.password)
    await user.type(screen.getByLabelText('Confirm password'), userData.password)
    await user.click(screen.getByRole('button', { name: 'Sign up' }))

    // expect loading indicator
    expect(screen.getByRole('presentation', { name: 'button-loading' })).toHaveTextContent(
      'Registering...'
    )
    await waitFor(() =>
      expect(screen.getByRole('presentation', { name: 'login-error' })).toHaveTextContent(
        'Username already exists. Please try again.'
      )
    )
    expect(mockRouterPush).toBeCalledTimes(0)
  })

  it('Routes to login page if user is valid', async () => {
    render(<SignUpForm />)

    // enter credentials
    const password = faker.internet.password()
    await user.type(screen.getByLabelText('Username'), faker.internet.userName())
    await user.type(screen.getByLabelText('Password'), password)
    await user.type(screen.getByLabelText('Confirm password'), password)
    await user.click(screen.getByRole('button', { name: 'Sign up' }))

    // expect loading indicator
    expect(screen.getByRole('presentation', { name: 'button-loading' })).toHaveTextContent(
      'Registering...'
    )

    await waitFor(() => {
      expect(mockRouterPush).toBeCalledWith('/login')
    })
  })
})
