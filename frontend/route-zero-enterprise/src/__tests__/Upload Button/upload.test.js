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
        expect(upProps.setFileCalls).toBe(0);
    });
    test("Test upload of a csv file", async () => {
        const upProps = getDefaultPropsUpload();
        render(getUploadComp(upProps));
        // Uploads file
        const file = new File(['hello'], 'hello.csv', { type: 'text/csv' });
        await waitFor(() => {
            userEvent.click(screen.getByText("Upload"));
            userEvent.upload(global.window.document.getElementById("file-input"), file);
        });
        // Asserts that file was uploaded
        expect(upProps.setFileCalls).toBe(1);
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
    let props = {        
        file: null,
        setFileCalls: 0,
        validity: "no_file",
        setFile(f) {
            this.file = f;
            this.setFileCalls++;
        },
        setValidity(v) {
            this.validity = v;
        }
    };
    props.setFile = props.setFile.bind(props);
    props.setValidity = props.setValidity.bind(props);
    return props;
}