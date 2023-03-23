import { render, screen, waitFor } from '@testing-library/react'
import { PromptSchemaCSV } from '../../components/Prompts/Prompts'
import { CSVSchema } from '../../pages/CSVSchema/CSVSchema'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { DownloadButton } from '../../components/Download/DownloadButton'

describe('PromptSchemaCSV Component Tests', () => {
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

describe("CSVSchema component tests", () => {
  test("Aesthetics of csv schema", () => {
    render(<CSVSchema />)
    // Tests general aesthetics of component
    expect(screen.getByText("CSV Schema")).toBeInTheDocument()
    expect(screen.getByText("Line format")).toBeInTheDocument()
    expect(screen.getByText("Please format each line of your CSV as follows:")).toBeInTheDocument()
    expect(screen.getByText("origin,destination,distanceKm,departureTime,arrivalTime,transport")).toBeInTheDocument()
    expect(screen.getByText("Download example")).toBeInTheDocument()
    expect(screen.getByText("Download")).toBeInTheDocument()
    expect(screen.getByText("Origin & Destination")).toBeInTheDocument()
    expect(screen.getByText("These are the name of the source and destination of your travel journey. Please include these names, but you could also opt to omit them. For more information, please refer to the example above.")).toBeInTheDocument()
    expect(screen.getByText("Distance")).toBeInTheDocument()
    expect(screen.getByText("This is the number of kilometers you travelled between source and destination. This information could easily be found through a map application such as Google Maps.")).toBeInTheDocument()
    expect(screen.getByText("Arrival & Departure time")).toBeInTheDocument()
    expect(screen.getByText("Please include the time in the following format yyyy-mm-ddThh:mm:ss.000Z, where yyyy stands for year, mm stands for month, dd stands for day, hh stands for hour, mm stands for minutes and ss stands for seconds, e.g. 2022-10-14T17:48:00.000Z.")).toBeInTheDocument()
    expect(screen.getByText("Transport")).toBeInTheDocument()
    expect(screen.getByText("To include the type of transportation used, please pick one from the following dictionary and use the exact spelling seen bellow:")).toBeInTheDocument()
    expect(screen.getByText("foot")).toBeInTheDocument()
    expect(screen.getByText("dieselCar")).toBeInTheDocument()
    expect(screen.getByText("bus")).toBeInTheDocument()
    expect(screen.getByText("tram")).toBeInTheDocument()
    expect(screen.getByText("bike")).toBeInTheDocument()
    expect(screen.getByText("hybridCar")).toBeInTheDocument()
    expect(screen.getByText("coach")).toBeInTheDocument()
    expect(screen.getByText("subway")).toBeInTheDocument()
    expect(screen.getByText("electricScooter")).toBeInTheDocument()
    expect(screen.getByText("electricCar")).toBeInTheDocument()
    expect(screen.getByText("eurostar")).toBeInTheDocument()
    expect(screen.getByText("flight")).toBeInTheDocument()
    expect(screen.getByText("petrolCar")).toBeInTheDocument()
    expect(screen.getByText("taxi")).toBeInTheDocument()
    expect(screen.getByText("lightRail")).toBeInTheDocument()
    expect(screen.getByText("lightRail")).toBeInTheDocument()
  })
})

describe("Download button for CSV schema tests", () => {
  test("Looks of button", () => {
    render(<DownloadButton />)
    expect(screen.getByText("Download")).toBeInTheDocument()
  })
})
