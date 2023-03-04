import { render, screen, waitFor } from '@testing-library/react'
import { PromptSchemaCSV } from '../../components/Prompts/Prompts'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

describe('CSV Scheme Component Tests', () => {
  test('CSV Schema properly configured when button has not been pressed to open it', () => {
    render(<PromptSchemaCSV />)
    // Ensures button exists but no other info is visible
    expect(screen.getAllByText('CSV Schema').length).toBe(1)
    expect(screen.getAllByText('CSV Schema')[0].disabled).toBe(false)
    // Tests that line of schema info is not visible
    expect(screen.queryByText('origin,destination,distanceKm,departureTime,arrivalTime,transport')).not.toBeInTheDocument()
  })
  test('CSV Scheme displays correct transport options', async () => {
    render(<PromptSchemaCSV />)
    userEvent.click(screen.getAllByText('CSV Schema')[0])
    userEvent.click(screen.getAllByText('View transport options')[0])
    // Waits for state to update
    await waitFor(() => {
      expect(screen.getByText('a journey taken by foot;')).toBeInTheDocument()
    })
    // Tests that all essential schema info is present.
    testSchemaInfoPresent()
    // Tests that drop down view of travel options is displayed
    expect(screen.getAllByText('a journey taken by foot;').length).toBe(1)
    expect(screen.getAllByText('foot').length).toBe(1)

    expect(screen.getAllByText('a journey by bicycle;').length).toBe(1)
    expect(screen.getAllByText('bike').length).toBe(1)

    expect(screen.getAllByText('a journey by electric scooter;').length).toBe(1)
    expect(screen.getAllByText('electricScooter').length).toBe(1)

    expect(screen.getAllByText('a journey driven in a petrol car;').length).toBe(1)
    expect(screen.getAllByText('petrolCar').length).toBe(1)

    expect(screen.getAllByText('a journey driven in a diesel car;').length).toBe(1)
    expect(screen.getAllByText('dieselCar').length).toBe(1)

    expect(screen.getAllByText('a journey driven in a hybrid car;').length).toBe(1)
    expect(screen.getAllByText('hybridCar').length).toBe(1)

    expect(screen.getAllByText('a journey driven in an electric car;').length).toBe(1)
    expect(screen.getAllByText('electricCar').length).toBe(1)

    expect(screen.getAllByText('a journey by taxi;').length).toBe(1)
    expect(screen.getAllByText('taxi').length).toBe(1)

    expect(screen.getAllByText('a journey driven by bus;').length).toBe(1)
    expect(screen.getAllByText('bus').length).toBe(1)

    expect(screen.getAllByText('a journey by coach;').length).toBe(1)
    expect(screen.getAllByText('coach').length).toBe(1)

    expect(screen.getAllByText('a journey on the Eurostar;').length).toBe(1)
    expect(screen.getAllByText('eurostar').length).toBe(1)

    expect(screen.getAllByText('a journey by light-rail;').length).toBe(1)
    expect(screen.getAllByText('lightRail').length).toBe(1)

    expect(screen.getAllByText('a journey by tram;').length).toBe(1)
    expect(screen.getAllByText('tram').length).toBe(1)

    expect(screen.getAllByText('a journey by subway;').length).toBe(1)
    expect(screen.getAllByText('subway').length).toBe(1)

    expect(screen.getAllByText('a journey by plane;').length).toBe(1)
    expect(screen.getAllByText('flight').length).toBe(1)

    expect(screen.getAllByText('a journey by plane;').length).toBe(1)
    expect(screen.getAllByText('flight').length).toBe(1)

    expect(screen.getAllByText('a journey by ferry;').length).toBe(1)
    expect(screen.getAllByText('ferry').length).toBe(1)
  })
  test('CSV Schema displayed when opened', () => {
    render(<PromptSchemaCSV />)
    // Clicks button to open schema and transport options
    userEvent.click(screen.getAllByText('CSV Schema')[0])
    testSchemaInfoPresent()
    // Checks that transport options are not displayed by default.
    expect(screen.queryByText('a journey taken by foot;')).not.toBeInTheDocument()
    expect(screen.queryByText('foot')).not.toBeInTheDocument()

    expect(screen.queryByText('a journey by bicycle;')).not.toBeInTheDocument()
    expect(screen.queryByText('bike')).not.toBeInTheDocument()

    expect(screen.queryByText('a journey by electric scooter;')).not.toBeInTheDocument()
    expect(screen.queryByText('electricScooter')).not.toBeInTheDocument()

    expect(screen.queryByText('a journey driven in a petrol car;')).not.toBeInTheDocument()
    expect(screen.queryByText('petrolCar')).not.toBeInTheDocument()

    expect(screen.queryByText('a journey driven in a diesel car;')).not.toBeInTheDocument()
    expect(screen.queryByText('dieselCar')).not.toBeInTheDocument()

    expect(screen.queryByText('a journey driven in a hybrid car;')).not.toBeInTheDocument()
    expect(screen.queryByText('hybridCar')).not.toBeInTheDocument()

    expect(screen.queryByText('a journey driven in an electric car;')).not.toBeInTheDocument()
    expect(screen.queryByText('electricCar')).not.toBeInTheDocument()

    expect(screen.queryByText('a journey by taxi;')).not.toBeInTheDocument()
    expect(screen.queryByText('taxi')).not.toBeInTheDocument()

    expect(screen.queryByText('a journey driven by bus;')).not.toBeInTheDocument()
    expect(screen.queryByText('bus')).not.toBeInTheDocument()

    expect(screen.queryByText('a journey by coach;')).not.toBeInTheDocument()
    expect(screen.queryByText('coach')).not.toBeInTheDocument()

    expect(screen.queryByText('a journey on the Eurostar;')).not.toBeInTheDocument()
    expect(screen.queryByText('eurostar')).not.toBeInTheDocument()

    expect(screen.queryByText('a journey by light-rail;')).not.toBeInTheDocument()
    expect(screen.queryByText('lightRail')).not.toBeInTheDocument()

    expect(screen.queryByText('a journey by tram;')).not.toBeInTheDocument()
    expect(screen.queryByText('tram')).not.toBeInTheDocument()

    expect(screen.queryByText('a journey by subway;')).not.toBeInTheDocument()
    expect(screen.queryByText('subway')).not.toBeInTheDocument()

    expect(screen.queryByText('a journey by plane;')).not.toBeInTheDocument()
    expect(screen.queryByText('flight')).not.toBeInTheDocument()

    expect(screen.queryByText('a journey by plane;')).not.toBeInTheDocument()
    expect(screen.queryByText('flight')).not.toBeInTheDocument()

    expect(screen.queryByText('a journey by ferry;')).not.toBeInTheDocument()
    expect(screen.queryByText('ferry')).not.toBeInTheDocument()
  })
  test('Closing schema only displays button', async () => {
    render(<PromptSchemaCSV />)
    // Opens schema then closes it
    await waitFor(() => {
      userEvent.click(screen.getByText('CSV Schema'))
      userEvent.click(screen.getByText('Close'))
    })
    // Checks that modal is no longer visible
    expect(global.window.document.getElementsByClassName('fade modal-backdrop').length).toBe(1)
    expect(global.window.document.getElementsByClassName('fade modal-backdrop show').length).toBe(0)
    // Gets modal component (as there are now two CSV Schema texts) and button
    let modal = null
    let modalsFound = 0
    let btn = null
    let btnsFound = 0
    const schemaList = screen.getAllByText('CSV Schema')
    for (let i = 0; i < schemaList.length; i++) {
      if (schemaList[i].tagName === 'DIV') {
        modalsFound++
        modal = schemaList[i]
      }
      if (schemaList[i].tagName === 'BUTTON') {
        btnsFound++
        btn = schemaList[i]
      }
    }
    expect(modalsFound).toBe(1)
    expect(btnsFound).toBe(1)
    expect(schemaList.length).toBe(2)
    // Checks that button is visible and nothing else
    console.log(modal.className)

    // expect(modal).not.toBeVisible();
    expect(btn.disabled).toBe(false)
  })
})

/**
 * Tests that general schema text is visible
 */
function testSchemaInfoPresent () {
  // Ensures text content is correctly displayed
  expect(screen.getAllByText('CSV Schema').length).toBe(2) // One for button, one for box title
  expect(screen.getAllByText('Line format').length).toBe(1)
  expect(screen.getAllByText('transport').length).toBe(1)
  expect(screen.getAllByText('Please format each line of your CSV as follows').length).toBe(1)
  expect(screen.getAllByText('origin,destination,distanceKm,departureTime,arrivalTime,transport').length).toBe(1)
  expect(screen.getAllByText('View transport options').length).toBe(1)
  expect(screen.getAllByText('Close').length).toBe(1)
}
