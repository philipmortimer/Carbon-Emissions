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
    expect(screen.getAllByText("Please select a file").length).toBe(1);
    expect(screen.getByText("See predictions").disabled).toBe(true); // Can't upload no file to API
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
    expect(screen.getAllByText("CSV file selected").length).toBe(1);
    expect(screen.getByText("See predictions").disabled).toBe(false);
  });
  test("Test that file upload for long file names have name truncated", async () => {
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
    expect(screen.getAllByText("CSV file selected").length).toBe(1);
    expect(screen.getByText("See predictions").disabled).toBe(false);
  });
  test("File that don't end in .csv can't be used for prediction", async () => {
    render(<App />);
    const uploadBtn = getUploadButton("Upload");
    // Uploads file
    const file = new File(['hello'], 'helloworlds.txt', { type: 'text/csv' });
    await waitFor(() => {
      userEvent.click(uploadBtn);
      userEvent.upload(global.window.document.getElementById("file-input"), file);
    });
    // Tests that button name changes to file content
    expect(screen.getByText("helloworlds.txt")).toBeInTheDocument();
    expect(screen.getByText("You must select a CSV file")).toBeInTheDocument();
    expect(screen.getByText("See predictions").disabled).toBe(true);
  });
});

describe("File Upload predictions retrieval tests", () => {
  test("Invalid file (via backend determination) displays an error message", async () => {
    // Mocks fetch response for given invalid file
    const invalidMessage = {
      error: "Line 2 contains an invalid transport type.  Transport type 'trainMisspelt' is invalid."
    };
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(invalidMessage)
      })
    );
    // Uploads file
    const textCont = "origin,destination,distanceKm,departureTime,arrivalTime,transport" +
      "\nPaddington,Bristol Parkway,179.08,2022-10-14T17:48:00.000Z,2022-10-14T19:01:00.000Z,trainMisspelt";
    const file = getCsvFile('invalidTransportType.csv', textCont);
    file.text();
    render(<App />);
    const btn = getUploadButton("Upload");
    await waitFor(() => {
      userEvent.click(btn);
      userEvent.upload(global.window.document.getElementById("file-input"), file);
      userEvent.click(screen.getByText("See predictions"));
      expect(screen.getByText("Invalid CSV File")).toBeInTheDocument();
    });
    // Test that invalid file modal appears
    expect(screen.getByText("Invalid CSV File")).toBeInTheDocument();
    expect(screen.getByText("File Incorretly Formatted")).toBeInTheDocument();
    expect(screen.getByText("The CSV file chosen is invalid as it does not meet the CSV schema." +
      " Please review the CSV schema and upload a valid file." +
      " An error message is provided below to help identify the issue.")).toBeInTheDocument();
    expect(screen.getByText("Line 2 contains an invalid transport type. Transport type 'trainMisspelt' is invalid."))
      .toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
    // Tests buttons are disabled
    await waitFor(() => {
      userEvent.click(screen.getByText("Close"));
    });
    expect(screen.getByText("See predictions").disabled).toBe(true);
    expect(screen.getByText("You must select a correctly formatted file")).toBeInTheDocument();
    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
  });
});

/**
 * Gets file implementation for testing.
 * @param {string} name file name
 * @param {string} text file content
 * @returns The file
 */
function getCsvFile(name, text) {
  const file = {
    name: name,
    text: () => Promise.resolve(text),
  };
  return file;
}

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

