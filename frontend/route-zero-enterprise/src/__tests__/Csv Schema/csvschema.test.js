import { render, screen, waitFor } from '@testing-library/react'
import { PromptSchemaCSV } from '../../components/Prompts/Prompts'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

describe('CSV Schema Component Tests', () => {
  test('CSV Schema button exists', () => {
    render(
      <>
        <Router>
          <PromptSchemaCSV />
          <Routes>
            <Route path='/schema' element={<p>gone to schema</p>} />
          </Routes>
        </Router>
      </>)
    // Ensures button exists but no other info is visible
    expect(screen.getAllByText('CSV Schema').length).toBe(1)
    expect(screen.getAllByText('CSV Schema')[0].disabled).toBe(false)
  })
  test('CSV Schema pressed takes user to schema page', async () => {
    render(
      <>
        <Router>
          <PromptSchemaCSV />
          <Routes>
            <Route path='/schema' element={<p>gone to schema</p>} />
          </Routes>
        </Router>
      </>)
    // Clicks schema button
    userEvent.click(screen.getByText("CSV Schema"))
    expect(screen.queryByText("gone to schema")).toBeInTheDocument()
  })
})
