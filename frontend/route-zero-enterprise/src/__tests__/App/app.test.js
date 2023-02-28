import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import App from '../../App';

describe("App tests", () => {
  test('Check website document title', () => {
    // Sets up Home component with props and renders it
    render(<App/>);
    expect(global.window.document.title).toBe('Upload Travel Data | RouteZero');
  });
});

