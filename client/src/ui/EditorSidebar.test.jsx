import React from 'react'
import { render, screen } from '@testing-library/react'
import EditorSidebar from './EditorSidebar'

it('renders components list', ()=>{
  render(<EditorSidebar />)
  expect(screen.getByText(/Components/i)).toBeTruthy()
  expect(screen.getByText(/Header/i)).toBeTruthy()
})
