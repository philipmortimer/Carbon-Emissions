// These tests test functions from chart.js which perform data manipulation to generate the graph values.
import '@testing-library/jest-dom'
import { tallyList, listToSet, mapToPairs, getTransportsCSV, journeyBars, emissionBars,
    transform, predictJourneyBars } from '../../helpers/chart'

describe("Tally List Tests", () => {
    test("Empty list returns empty set", () => {
        const list = []
        const set = tallyList(list)
        expect(JSON.stringify(set) === JSON.stringify({})).toBe(true);
    })
})