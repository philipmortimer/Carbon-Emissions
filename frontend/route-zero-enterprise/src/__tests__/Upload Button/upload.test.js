import { render, screen } from '@testing-library/react'
import { UploadButton } from '../../components/Upload/Upload';
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom'

describe("Tests upload component", () => {
    test("Tests upload component when no file has been uploaded", () => {
        const upProps = getDefaultPropsUpload();
        render(<UploadButton props={upProps}/>);
        // Tests default state values
        expect(upProps.file).toEqual(null);
        expect(upProps.validity).toEqual("no_file");
        // Test button exists and state
        expect(screen.getByText("Upload").disabled).toBe(false);
    });
});

/**
 * Helper function for tests of Upload component. Sets up default values for data passed to upload component
 * @returns The default value for various variables used by the upload component.
 */
function getDefaultPropsUpload() {
    // Sets up props of Upload
    let file = null;
    const setFile = (f) => { file = f; };
    let validity = "no_file";
    const setValidity = (v) => { validity = v; };
    return {file, setFile, validity, setValidity};
}