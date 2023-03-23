import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { InvalidFileModal } from '../../components/InvalidFileModal/InvalidFileModal'

describe('Aesthetic tests invalid file modal', () => {
  test('Test modal displays correctly for chosen error message', () => {
    const msg = 'testMessage here'
    render(<InvalidFileModal show msg={msg} />)
    // Test that invalid file modal appears
    expect(screen.getByText('Invalid CSV File')).toBeInTheDocument()
    expect(screen.getByText('File Incorretly Formatted')).toBeInTheDocument()
    expect(screen.getByText('The CSV file chosen is invalid as it does not meet the CSV schema.' +
            ' Please review the CSV schema and upload a valid file.' +
            ' An error message is provided below to help identify the issue.')).toBeInTheDocument()
    expect(screen.getByText(msg)).toBeInTheDocument()
    expect(screen.getByText('Close')).toBeInTheDocument()
  })
  test('Hidden modal does not render', () => {
    const msg = 'testMessage here'
    render(<InvalidFileModal show={false} msg={msg} />)
    // Test that invalid file modal appears
    expect(screen.queryByText('Invalid CSV File')).not.toBeInTheDocument()
  })
  test('Closing modal calls onHide function', async () => {
    const msg = 'testMessage here'
    const callCounter = { calls: 0, incCalls: function () { this.calls++ } }
    callCounter.incCalls = callCounter.incCalls.bind(callCounter)
    render(<InvalidFileModal show msg={msg} onHide={callCounter.incCalls} />)
    expect(callCounter.calls).toBe(0)
    // Closes modal
    await waitFor(() => {
      userEvent.click(screen.getByText('Close'))
    })
    expect(callCounter.calls).toBe(1)
  })
})
