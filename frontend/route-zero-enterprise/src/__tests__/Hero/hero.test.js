import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
import { Hero } from '../../components/Hero/Hero';

describe("Tests aesthetics of header", () => {
    test("Tests that upload and view tabs exist", () => {
        render(getHero(null));
        expect(screen.queryByText("Upload")).toBeInTheDocument();
        expect(screen.queryByText("View")).toBeInTheDocument();
    });
    test("Default page for hero test is upload", () => {
        render(getHero(null));
        expect(screen.queryByText("up page")).toBeInTheDocument();
        expect(screen.queryByText("view page")).not.toBeInTheDocument();
    })
    test("Tests that no API response leads to disabled view tab", async () => {
        render(getHero(null));
        // Clicks view button
        await waitFor(() => {
            userEvent.click(screen.getByText("View"));
        });
        expect(screen.queryByText("up page")).toBeInTheDocument();
        expect(screen.queryByText("view page")).not.toBeInTheDocument();
    });
});

/**
 * Gets hero component wrapped in router for testing
 * @param {*} response The response prop
 * @returns The JSX comp
 */
function getHero(response){
    return(
        <>
        <Router>
          <Hero response={response}/>
            <Routes>  
            <Route path="/" element={<p>up page</p>} />
            <Route path="/view" element={<p>view page</p>}/>
            </Routes>
        </Router>
      </>
    );
}