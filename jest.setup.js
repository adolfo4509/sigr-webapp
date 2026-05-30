import '@testing-library/jest-dom'
import React from 'react'

jest.mock('next/link', () => ({ children, href }) => {
  return <a href={href}>{children}</a>
})
