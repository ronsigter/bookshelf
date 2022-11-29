import { render, screen } from 'lib/jest'
import Home from '../'

describe('Home Page', () => {
  const setup = () => render(<Home />)

  it('renders Home page successfully', () => {
    setup()
    expect(screen.getByText('home')).toBeInTheDocument()
  })
})
