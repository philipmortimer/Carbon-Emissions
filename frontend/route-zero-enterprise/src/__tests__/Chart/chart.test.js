// These tests test functions from chart.js which perform data manipulation to generate the graph values.
import '@testing-library/jest-dom'
import {
    tallyList, listToSet, mapToPairs, getTransportsCSV, journeyBars, emissionBars,
    transform, predictJourneyBars
} from '../../helpers/chart'
import { emptyFile, simpleFile, exampleFile } from '../View/view.test'

describe("Tally List Tests", () => {
    test("Empty list returns empty set", () => {
        const list = []
        const set = tallyList(list)
        expect(JSON.stringify(set) === JSON.stringify({})).toBe(true);
    })
    test("Single element list returns correct tally", () => {
        const list = ['train']
        const map = tallyList(list)
        const expectedMap = { 'train': 1 }
        expect(JSON.stringify(map) === JSON.stringify(expectedMap)).toBe(true);
    })
    test("Multiple instances of single type of instance sum up", () => {
        const list = ['train', 'train', 'train', 'train']
        const map = tallyList(list)
        const expectedMap = { 'train': 4 }
        expect(JSON.stringify(map) === JSON.stringify(expectedMap)).toBe(true);
    })
    test("Multiple types are all correctly tallied together", () => {
        const list = ['car', 'train', 'train', 'car', 'foot', 'bike', 'bike', 'train', 'train', 'chopper']
        const map = tallyList(list)
        const expectedMap = {
            'car': 2,
            'train': 4,
            'foot': 1,
            'bike': 2,
            'chopper': 1
        }
        expect(JSON.stringify(map) === JSON.stringify(expectedMap)).toBe(true);
    })
})

describe("List to set tests", () => {
    test("Empty list produces empty set", () => {
        const list = []
        const set = listToSet(list)
        expect(set).toEqual([]);
    })
    test("List with no duplicates remains the same", () => {
        const list = ['train', 'foot', 'bike']
        const set = listToSet(list)
        expect(set).toEqual(['train', 'foot', 'bike']);
    })
    test("Singleton list remains constant", () => {
        const list = ['train']
        const set = listToSet(list)
        expect(set).toEqual(['train']);
    })
    test("List with all the same item consolidated down to one element", () => {
        const list = ['train', 'train', 'train', 'train', 'train', 'train', 'train', 'train']
        const set = listToSet(list)
        expect(set).toEqual(['train']);
    })
    test("List with large number of elements of different varieties", () => {
        const list = ['car', 'train', 'train', 'car', 'foot', 'bike', 'bike', 'train', 'train', 'chopper']
        const set = listToSet(list)
        expect(set).toEqual(['car', 'train', 'foot', 'bike', 'chopper']);
    })
})

describe("Map to pairs tests", () => {
    test("Empty inputs", () => {
        const keys = []
        const tallys = []
        const pairs = mapToPairs(keys, tallys)
        expect(pairs).toStrictEqual([])
    })
    test("Single key", () => {
        const keys = ['train']
        const tallys = { 'train': 100 }
        const pairs = mapToPairs(keys, tallys)
        expect(pairs).toStrictEqual([['train', 100]])
    })
    test("Large number of keys", () => {
        const keys = ['train', 'car', 'foot', 'bike', 'scooter']
        const tallys = {
            'train': 12,
            'car': 5,
            'bike': 11023,
            'foot': 117,
            'scooter': 1
        }
        const pairs = mapToPairs(keys, tallys)
        expect(pairs).toEqual([['train', 12], ['car', 5], ['foot', 117], ['bike', 11023], ['scooter', 1]])
    })
})

describe("Get Transport CSV test", () => {
    test("Empty CSV file", async () => {
        // Gets file text
        let text = undefined
        await emptyFile.file.text()
            .then(txt => text = txt)
        expect(text === undefined).toBe(false)
        // Tests extraction of transport types
        const transports = getTransportsCSV(text)
        expect(transports).toStrictEqual([])
    })
    test("Simple CSV file", async () => {
        // Gets file text
        let text = undefined
        await simpleFile.file.text()
            .then(txt => text = txt)
        expect(text === undefined).toBe(false)
        // Tests extraction of transport types
        const transports = getTransportsCSV(text)
        expect(transports).toStrictEqual(['train'])
    })
    test("Example CSV file", async () => {
        // Gets file text
        let text = undefined
        await exampleFile.file.text()
            .then(txt => text = txt)
        expect(text === undefined).toBe(false)
        // Tests extraction of transport types
        const transports = getTransportsCSV(text)
        console.log(transports)
        expect(transports).toStrictEqual([
            'train', 'foot', 'train', 'bus', 'foot', 'flight', 'foot', 'train', 'foot',
            'train', 'petrolCar', 'eurostar', 'petrolCar', 'foot', 'train', 'foot', 'eurostar',
            'subway', 'foot', 'taxi', 'flight', 'taxi', 'foot', 'train', 'foot', 'eurostar', 'foot',
            'train', 'foot', 'train', 'petrolCar', 'flight', 'bike', 'petrolCar', 'flight',
            'foot', 'tram', 'foot', 'foot', 'subway', 'foot', 'subway', 'foot', 'flight', 'taxi',
            'dieselCar', 'bus', 'foot', 'flight', 'taxi', 'coach', 'electricScooter', 'bus', 'foot',
            'flight', 'foot', 'train', 'petrolCar', 'electricCar', 'electricCar', 'train', 'foot', 'train',
            'train', 'foot', 'train', 'petrolCar', 'coach', 'train', 'foot', 'subway', 'foot', 'eurostar',
            'coach', 'foot', 'bus'
        ])
    })
})