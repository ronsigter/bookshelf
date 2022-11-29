import { render, screen } from 'lib/jest'
import Home from '../'

describe('Home Page', () => {
  beforeEach(() => {
    render(<Home />)
  })

  it('renders Home page successfully', () => {
    expect(screen.getByText('home')).toBeInTheDocument()
  })
})
