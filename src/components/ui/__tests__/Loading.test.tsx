import { render, screen } from '@testing-library/react'
import Loading from '../Loading'

describe('Loading Component', () => {
  it('renders loading spinner', () => {
    render(<Loading />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('renders with custom text', () => {
    render(<Loading text="Custom loading..." />)
    expect(screen.getByText('Custom loading...')).toBeInTheDocument()
  })

  it('renders with default text', () => {
    render(<Loading />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<Loading />)
    const loadingElement = screen.getByRole('status')
    expect(loadingElement).toHaveAttribute('aria-label', 'Loading')
  })
})
