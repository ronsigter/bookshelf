import { render, screen, userEvent } from 'lib/jest'
import { NavBar } from '../NavBar'

const mockRouterReplace = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      replace: mockRouterReplace
    }
  }
}))

describe('<Navbar />', () => {
  const user = userEvent.setup()

  it('renders the NavBar elements', () => {
    render(<NavBar />)

    const links = screen.getAllByRole('link')
    expect(links[0]).toHaveAttribute('href', '/dashboard')
    expect(links[1]).toHaveAttribute('href', '#')
    expect(links[2]).toHaveAttribute('href', '#')
    expect(links[3]).toHaveAttribute('href', '#')
    expect(screen.getByRole('button', { name: /sign out/i })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /bookney-logo/i })).toBeInTheDocument()
  })

  it('log out signed user', async () => {
    render(<NavBar />)

    await user.click(screen.getByRole('button', { name: /sign out/i }))

    expect(mockRouterReplace).toHaveBeenCalledWith('/login')
  })
})
