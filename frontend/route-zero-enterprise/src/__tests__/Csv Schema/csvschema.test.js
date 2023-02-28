import { render, screen } from '@testing-library/react'
import { PromptSchemaCSV } from '../../components/Prompts/Prompts';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

describe("CSV Scheme Component Tests", () => {
    test("CSV Schema displayed when opened", () => {
        render(<PromptSchemaCSV />);
        // Clicks button to open schema
        userEvent.click(screen.getAllByText("CSV Schema")[0]);
        // Ensures text content is correctly displayed
        expect(screen.getAllByText("CSV Schema").length).toBe(2); // One for button, one for box title
        expect(screen.getAllByText("Line format").length).toBe(1);
        expect(screen.getAllByText("transport").length).toBe(1);
        expect(screen.getAllByText("Please format each line of your CSV as follows").length).toBe(1);
        expect(screen.getAllByText("origin,destination,distanceKm,departureTime,arrivalTime,transport").length).toBe(1);
        expect(screen.getAllByText("View transport options").length).toBe(1);
        expect(screen.getAllByText("Close").length).toBe(1);
        // Checks that transport options are not displayed by default.
        expect(screen.queryByText("a journey taken by foot;")).not.toBeInTheDocument();
        expect(screen.queryByText("foot")).not.toBeInTheDocument();

        expect(screen.queryByText("a journey by bicycle;")).not.toBeInTheDocument();
        expect(screen.queryByText("bike")).not.toBeInTheDocument();

        expect(screen.queryByText("a journey by electric scooter;")).not.toBeInTheDocument();
        expect(screen.queryByText("electricScooter")).not.toBeInTheDocument();

        expect(screen.queryByText("a journey driven in a petrol car;")).not.toBeInTheDocument();
        expect(screen.queryByText("petrolCar")).not.toBeInTheDocument();

        expect(screen.queryByText("a journey driven in a diesel car;")).not.toBeInTheDocument();
        expect(screen.queryByText("dieselCar")).not.toBeInTheDocument();

        expect(screen.queryByText("a journey driven in a hybrid car;")).not.toBeInTheDocument();
        expect(screen.queryByText("hybridCar")).not.toBeInTheDocument();

        expect(screen.queryByText("a journey driven in an electric car;")).not.toBeInTheDocument();
        expect(screen.queryByText("electricCar")).not.toBeInTheDocument();

        expect(screen.queryByText("a journey by taxi;")).not.toBeInTheDocument();
        expect(screen.queryByText("taxi")).not.toBeInTheDocument();

        expect(screen.queryByText("a journey driven by bus;")).not.toBeInTheDocument();
        expect(screen.queryByText("bus")).not.toBeInTheDocument();

        expect(screen.queryByText("a journey by coach;")).not.toBeInTheDocument();
        expect(screen.queryByText("coach")).not.toBeInTheDocument();

        expect(screen.queryByText("a journey on the Eurostar;")).not.toBeInTheDocument();
        expect(screen.queryByText("eurostar")).not.toBeInTheDocument();

        expect(screen.queryByText("a journey by light-rail;")).not.toBeInTheDocument();
        expect(screen.queryByText("lightRail")).not.toBeInTheDocument();

        expect(screen.queryByText("a journey by tram;")).not.toBeInTheDocument();
        expect(screen.queryByText("tram")).not.toBeInTheDocument();

        expect(screen.queryByText("a journey by subway;")).not.toBeInTheDocument();
        expect(screen.queryByText("subway")).not.toBeInTheDocument();

        expect(screen.queryByText("a journey by plane;")).not.toBeInTheDocument();
        expect(screen.queryByText("flight")).not.toBeInTheDocument();

        expect(screen.queryByText("a journey by plane;")).not.toBeInTheDocument();
        expect(screen.queryByText("flight")).not.toBeInTheDocument();

        expect(screen.queryByText("a journey by ferry;")).not.toBeInTheDocument();
        expect(screen.queryByText("ferry")).not.toBeInTheDocument();
    });
});