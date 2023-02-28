import {render, screen} from '@testing-library/react'
import {Home} from '../../pages/Home/Home';
import userEvent from '@testing-library/user-event'
import {BrowserRouter} from "react-router-dom";
import '@testing-library/jest-dom'

test("Tests default state of file upload", () => {
    // Sets up props of Home
    let file = null;
    const setFile = (f) => {file = f;};
    let response = null;
    const setResponse = (r) => {response = r;};
    let validity = "no_file";
    const setValidity = (v) => {validity = v;};
    // Renders component (note it needs to be wrapped by a router)
    render(
        <BrowserRouter>
            <Home file={file} setFile={setFile} validity={validity} 
            setValidity={setValidity} setResponse={setResponse}/>
        </BrowserRouter>
    );
});