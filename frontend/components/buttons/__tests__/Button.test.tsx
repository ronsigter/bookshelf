import { render, screen } from 'lib/jest'
import { Button } from '../Button'

describe('<Button />', () => {
  it('shows the passed label', () => {
    render(<Button label="This is a button" />)

    expect(screen.getByRole('button', { name: /this is a button/i })).toHaveTextContent(
      'This is a button'
    )
  })
})
