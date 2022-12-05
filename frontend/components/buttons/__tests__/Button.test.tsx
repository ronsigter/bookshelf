import { render, screen } from 'lib/jest'
import { Button } from '../Button'

describe('<Button />', () => {
  it('renders the button component', () => {
    render(<Button>Button test</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Button test')
  })

  it('renders the loading animation', () => {
    render(<Button isLoading>Button test</Button>)
    expect(screen.getByRole('presentation')).toBeInTheDocument()
  })
})
