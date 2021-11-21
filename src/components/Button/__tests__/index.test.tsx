import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Button from '..'

describe('Button', () => {
  const onClick = jest.fn()

  it('renders Button', () => {
    render(<Button onClick={onClick}>test</Button>)
    expect(screen.getByRole('button', { name: 'test' })).toBeInTheDocument()
  })

  it('calls onClick on click', () => {
    render(<Button onClick={onClick}>test</Button>)
    const button = screen.getByRole('button', { name: 'test' })

    userEvent.click(button)

    expect(onClick).toBeCalled()
  })
})
