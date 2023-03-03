import { render, screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import {KiloTonBubble} from '../../components/KiloTonBubble/KiloTonBubble';

describe("Kilo Ton Bubble aesthetics", () => {
    test("Displays numbercorretly", () => {
        render(<KiloTonBubble setPolicies={null} policyOption={"Policy Name Example"} 
            journeysState={null} emissionsState={null} savedCO2e={100.3}/>);
        expect(screen.queryByText("100.3Kt")).toBeInTheDocument();
    });
    test("Rounds display number", () => {
        render(<KiloTonBubble setPolicies={null} policyOption={"Policy Name Example"} 
            journeysState={null} emissionsState={null} savedCO2e={100.299}/>);
        expect(screen.queryByText("100.3Kt")).toBeInTheDocument();
    });
});