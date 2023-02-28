import { render, screen } from '@testing-library/react'
import { Home } from '../../pages/Home/Home';
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom'


describe("File upload tests", () => {
    test("File is null when no actions have been performed", () => {
        const defProps = getDefaultPropsHome();
        // Renders component
        render( getHomeTestComponent(defProps) );
        // Tests that file does not change
        expect(defProps.file).toEqual(null);
    });
    test("", () => {
        const defProps = getDefaultPropsHome();
        // Renders component
        render( getHomeTestComponent(defProps) );
        // Tests that file does not change
        expect(defProps.file).toEqual(null);
    });
});

describe("Home page aesthetics", () => {
    test("Home page title", () => {
        expect(global.window.document.title).toBe('Upload Travel Data | RouteZero');
    });
});

/**
 * Returns the home component with the provided test properties
 * @param {*} testProps The test properties (obtained by calling getDefaultPropsHome())
 * @returns The JSX for the home component.
 */
function getHomeTestComponent(testProps) {
    return (            
    <BrowserRouter>
        <Home file={testProps.file} setFile={testProps.setFile} validity={testProps.validity}
            setValidity={testProps.setValidity} setResponse={testProps.setResponse} />
    </BrowserRouter>
    );
}

/**
 * Helper function for tests of home component. Sets up default values for data passed to home component
 * @returns The default value for various variables used by the home component.
 */
function getDefaultPropsHome() {
    // Sets up props of Home
    let file = null;
    const setFile = (f) => { file = f; };
    let response = null;
    const setResponse = (r) => { response = r; };
    let validity = "no_file";
    const setValidity = (v) => { validity = v; };
    return {file, setFile, response, setResponse, validity, setValidity};
}