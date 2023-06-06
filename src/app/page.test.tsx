import { expect, test } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import Home from './page'

test('home', () => {
  render(<Home />)
  screen.debug()
})
