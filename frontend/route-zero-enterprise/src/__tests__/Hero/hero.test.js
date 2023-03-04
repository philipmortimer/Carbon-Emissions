import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { Hero } from '../../components/Hero/Hero'

describe('Tests aesthetics of header', () => {
  test('Tests that upload and view tabs exist', () => {
    render(getHero(null))
    expect(screen.queryByText('Upload')).toBeInTheDocument()
    expect(screen.queryByText('View')).toBeInTheDocument()
    // Test default page layout is correct
    expect(screen.queryByText('up page')).toBeInTheDocument()
    expect(screen.queryByText('view page')).not.toBeInTheDocument()
  })
  test('Default page for hero test is upload', () => {
    render(getHero(null))
    expect(screen.queryByText('up page')).toBeInTheDocument()
    expect(screen.queryByText('view page')).not.toBeInTheDocument()
  })
  test('Tests that no API response leads to disabled view tab', async () => {
    render(getHero(null))
    // Clicks view button
    await waitFor(() => {
      userEvent.click(screen.getByText('View'))
    })
    expect(screen.queryByText('up page')).toBeInTheDocument()
    expect(screen.queryByText('view page')).not.toBeInTheDocument()
  })
  test('API response enables view tab', async () => {
    render(getHero('sample_response'))
    // Clicks view button
    await waitFor(() => {
      userEvent.click(screen.getByText('View'))
    })
    expect(screen.queryByText('up page')).not.toBeInTheDocument()
    expect(screen.queryByText('view page')).toBeInTheDocument()
  })
  test('Can navigate back to upload tab after viewing API response', async () => {
    render(getHero('sample_response'))
    // Clicks view button and then goes back to upload tab
    await waitFor(() => {
      userEvent.click(screen.getByText('View'))
      userEvent.click(screen.getByText('Upload'))
    })
    expect(screen.queryByText('up page')).toBeInTheDocument()
    expect(screen.queryByText('view page')).not.toBeInTheDocument()
  })
  test('Upload button takes user to upload page when already on upload page', async () => {
    render(getHero('sample_response'))
    // Clicks upload button
    await waitFor(() => {
      userEvent.click(screen.getByText('Upload'))
    })
    expect(screen.queryByText('up page')).toBeInTheDocument()
    expect(screen.queryByText('view page')).not.toBeInTheDocument()
  })
  test('Pressing view button in view tab causes user to stay there', async () => {
    render(getHero('sample_response'))
    // Clicks view button twice
    await waitFor(() => {
      userEvent.click(screen.getByText('View'))
      userEvent.click(screen.getByText('View'))
    })
    expect(screen.queryByText('up page')).not.toBeInTheDocument()
    expect(screen.queryByText('view page')).toBeInTheDocument()
  })
})

/**
 * Gets hero component wrapped in router for testing
 * @param {*} response The response prop
 * @returns The JSX comp
 */
function getHero (response) {
  return (
    <>
      <Router>
        <Hero response={response} />
        <Routes>
          <Route path='/' element={<p>up page</p>} />
          <Route path='/view' element={<p>view page</p>} />
        </Routes>
      </Router>
    </>
  )
}
