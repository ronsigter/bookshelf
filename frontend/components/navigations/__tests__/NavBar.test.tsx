import { render, screen, setupMockServer, userEvent } from 'lib/jest'
import { NavBar } from '../NavBar'
import type { SignOutParams } from 'next-auth/react'
import { listBooksApiHandler } from 'mocks/books-api-handler'

const mockNextAuthSignOut = jest.fn()
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
    }),
    signOut(options: SignOutParams) {
      mockNextAuthSignOut(options)
    }
  }
})

setupMockServer(listBooksApiHandler)

describe('<Navbar />', () => {
  const user = userEvent.setup()

  it('renders the NavBar elements', () => {
    render(<NavBar />)

    const links = screen.getAllByRole('link')
    expect(links[0]).toHaveAttribute('href', '/dashboard')
    expect(links[1]).toHaveAttribute('href', '/dashboard')
    expect(links[2]).toHaveAttribute('href', '/my-list')
    expect(screen.getByRole('button', { name: /sign out/i })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: /bookney-logo/i })).toBeInTheDocument()
  })

  it('logs out signed user', async () => {
    render(<NavBar />)

    await user.click(screen.getByRole('button', { name: /sign out/i }))

    expect(mockNextAuthSignOut).toHaveBeenCalledWith({
      callbackUrl: '/login'
    })
  })
})
