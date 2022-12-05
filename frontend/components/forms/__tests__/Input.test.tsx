import { render, screen } from 'lib/jest'
import { Input } from '../Input'

describe('<Input />', () => {
  it('renders the Input component', () => {
    render(<Input label="Username" />)
    expect(screen.getByLabelText('Username')).toHaveTextContent('')
  })

  it('renders a red border if error', () => {
    render(<Input isError={true} label="Username" />)
    expect(screen.getByLabelText('Username')).toHaveClass('border-red-500')
  })
})
