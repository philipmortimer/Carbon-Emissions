import { render, screen } from '@testing-library/react'
import { Home } from '../../pages/Home/Home'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import { beforeTests } from '../View/view.test'
import 'jest-canvas-mock';

beforeTests()

describe('File upload tests', () => {
  test('File is null when no actions have been performed', () => {
    const defProps = getDefaultPropsHome()
    // Renders component
    render(getHomeTestComponent(defProps))
    // Tests that file does not change
    expect(defProps.file).toEqual(null)
    expect(defProps.setFileCalls).toBe(0)
    expect(screen.getByText('Upload')).toBeInTheDocument()
  })
})

describe('Home page aesthetics', () => {
  test('Home page title', () => {
    render(getHomeTestComponent(getDefaultPropsHome()))
    expect(global.window.document.title).toBe('Upload Travel Data | RouteZero')
  })
  test('Default text', () => {
    render(getHomeTestComponent(getDefaultPropsHome()))
    // Checks that exactly one of each of the following default text items exists
    expect(screen.getAllByText('Do you want to know your potential carbon savings?').length).toBe(1)
    expect(screen.getAllByText('Simply upload your travel expense or milage data as a CSV or JSON file').length).toBe(1)
    expect(screen.getAllByText('Please select a file').length).toBe(1)
    expect(screen.getAllByText('CSV Schema').length).toBe(1)
    expect(screen.getAllByText('Upload').length).toBe(1)
    expect(screen.getAllByText('See predictions').length).toBe(1)
  })
  test('Default enabled status of buttons', () => {
    render(getHomeTestComponent(getDefaultPropsHome()))
    // Checks that the default state of buttons being enabled / disbaled is correct
    expect(screen.getAllByText('CSV Schema')[0].disabled).toBe(false)
    expect(screen.getAllByText('Upload')[0].disabled).toBe(false)
    expect(screen.getAllByText('See predictions')[0].disabled).toBe(true)
  })
})

/**
 * Returns the home component with the provided test properties
 * @param {*} testProps The test properties (obtained by calling getDefaultPropsHome())
 * @returns The JSX for the home component.
 */
function getHomeTestComponent (testProps) {
  return (
    <BrowserRouter>
      <Home
        file={testProps.file} setFile={testProps.setFile} validity={testProps.validity}
        setValidity={testProps.setValidity} setResponse={testProps.setResponse}
      />
    </BrowserRouter>
  )
}

/**
 * Helper function for tests of home component. Sets up default values for data passed to home component
 * @returns The default value for various variables used by the home component.
 */
function getDefaultPropsHome () {
  // Sets up props of Home
  const props = {
    file: null,
    response: null,
    validity: 'no_file',
    setFileCalls: 0,
    setFile (f) {
      this.file = f
      this.setFileCalls++
    },
    setValidity (v) {
      this.validity = v
    },
    setResponse (r) {
      this.response = r
    }
  }
  props.setFile = props.setFile.bind(props)
  props.setValidity = props.setValidity.bind(props)
  props.setResponse = props.setResponse.bind(props)
  return props
}
