import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import App from '../App';


test('Check website document title is correct.', async () => {
  // ARRANGE
  render(<App/>)

  // ACT
  //await userEvent.click(screen.getByText('Load Greeting'))
  //await screen.findByRole('heading')

  // ASSERT
  expect(global.window.document.title).toBe('Upload Travel Data | RouteZero');
  //expect(screen.getByRole('heading')).toHaveTextContent('hello there')
  //expect(screen.getByRole('button')).toBeDisabled()
})