import { render, screen } from '@testing-library/react'
import MenuClientes from './index'

describe('MenuClientes', () => {
  it('renders menu heading and links', () => {
    render(<MenuClientes />)

    expect(screen.getByRole('heading', { name: /menu disponible/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /login/i })).toHaveAttribute('href', '/login')
    expect(screen.getByRole('link', { name: /ir al dashboard/i })).toHaveAttribute('href', '/dashboard')
  })
})
