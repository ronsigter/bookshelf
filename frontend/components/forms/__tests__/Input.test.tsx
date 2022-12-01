import { render, screen } from 'lib/jest'
import { Input } from '../Input'

describe('<Input />', () => {
  it('shows the passed label', () => {
    render(<Input label="Username" />)

    expect(screen.getByRole('textbox', { name: /username/i })).toBeInTheDocument()
  })
})
