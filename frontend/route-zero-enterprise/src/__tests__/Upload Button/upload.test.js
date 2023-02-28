import { render, screen, waitFor } from '@testing-library/react'
import { UploadButton } from '../../components/Upload/Upload';
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom'

describe("Tests upload component", () => {
    test("Tests upload component when no file has been uploaded", () => {
        const upProps = getDefaultPropsUpload();
        render(getUploadComp(upProps));
        // Tests default state values
        expect(upProps.file).toEqual(null);
        expect(upProps.validity).toEqual("no_file");
        // Test button exists and state
        expect(screen.getByText("Upload").disabled).toBe(false);
    });
    test("Test upload of a csv file", async () => {
        const upProps = getDefaultPropsUpload();
        render(getUploadComp(upProps));
        // Uploads file
        const file = new File(['hello'], 'hello.csv', { type: 'text/csv' });
        console.log(upProps.validity);
        await waitFor(() => {
            userEvent.click(screen.getByText("Upload"));
            userEvent.upload(global.window.document.getElementById("file-input"), file);
        });
        console.log("After");
        console.log(upProps.validity);
    });
});

/**
 * Gets Upload component with provided properties
 * @param {*} props The properties
 * @returns The JSX
 */
function getUploadComp(props) {
    return (
        <UploadButton setFile={props.setFile} file={props.file} 
        validity={props.validity} setValidity={props.setValidity}/>
    );
}

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