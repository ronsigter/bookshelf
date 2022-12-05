import { render, screen } from 'lib/jest'
import { LoginForm } from '../LoginForm'

describe('<LoginForm />', () => {
  it('Renders the login form', () => {
    render(<LoginForm />)
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument()
  })
})
