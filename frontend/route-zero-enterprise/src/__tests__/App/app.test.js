import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import App from '../../App';

describe("App tests", () => {
  test('Check website document title', () => {
    // Sets up App component with props and renders it
    render(<App />);
    expect(global.window.document.title).toBe('Upload Travel Data | RouteZero');
  });
});

describe("File upload tests", () => {
  test("Tests that no file upload leads to state being as expected", () => {
    render(<App />);
    const uploadBtn = getUploadButton("Upload");
    expect(uploadBtn.disabled).toBe(false);
  });
  test("Tests that file upload changes upload button name", async () => {
    render(<App />);
    const uploadBtn = getUploadButton("Upload");
    // Uploads file
    const file = new File(['hello'], 'helloworlds.csv', { type: 'text/csv' });
    await waitFor(() => {
      userEvent.click(uploadBtn);
      userEvent.upload(global.window.document.getElementById("file-input"), file);
    });
    // Tests that button name changes to file content
    expect(getUploadButton("helloworlds.csv").disabled).toBe(false);
  });
  test("Test that file upload for long file names have name truncated", async() => {
    render(<App />);
    const uploadBtn = getUploadButton("Upload");
    // Uploads file
    const file = new File(['hello'], 'helloworlds1.csv', { type: 'text/csv' });
    await waitFor(() => {
      userEvent.click(uploadBtn);
      userEvent.upload(global.window.document.getElementById("file-input"), file);
    });
    // Tests that button name changes to file content
    expect(getUploadButton("helloworlds1.cs...").disabled).toBe(false);
  });
  test("File that don't end in .csv can't be uploaded", async () => {
    
  });
});

/**
 * Gets upload button from app component. If no such component exists, an error is thrown.
 * @param {string} text The text content of the button
 * @returns The button
 */
function getUploadButton(text) {
  // Locates button element
  const uploadComps = screen.getAllByText(text);
  let btn = null;
  let buttonsFound = 0;
  // Finds button component
  for (let i = 0; i < uploadComps.length; i++) {
    if (uploadComps[i].tagName === "BUTTON") {
      btn = uploadComps[i];
      buttonsFound++;
    }
  }
  expect(buttonsFound).toBe(1);
  return btn;
}

