import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import App from '../../App';


test('Check website document title', async () => {
  // Sets up Home component with props and renders it
   render(<App/>);
  // Test
  expect(global.window.document.title).toBe('Upload Travel Data | RouteZero');
});