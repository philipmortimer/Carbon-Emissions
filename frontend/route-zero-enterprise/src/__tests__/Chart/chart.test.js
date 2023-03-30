// These tests test functions from chart.js which perform data manipulation to generate the graph values.
import '@testing-library/jest-dom'
import {
    tallyList, listToSet, mapToPairs, journeyBars, emissionBarsBefore,
    transform, predictJourneyBars, emissionBarsAfter
} from '../../helpers/chart'
import {getTransports} from '../../helpers/file'
import { emptyFile, simpleFile, exampleFile } from '../View/view.test'
import 'jest-canvas-mock';

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
        // Tests extraction of transport types
        const transports = await getTransports(emptyFile.file)
        expect(transports).toStrictEqual([])
    })
    test("Simple CSV file", async () => {
        // Tests extraction of transport types
        const transports = await getTransports(simpleFile.file)
        expect(transports).toStrictEqual(['train'])
    })
    test("Example CSV file", async () => {
        // Tests extraction of transport types
        const transports = await getTransports(exampleFile.file)
        expect(transports).toEqual([
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

describe("Journet Bars test", () => {
    test("Empty file", async () => {
        const pairs = await journeyBars(emptyFile.file)
        expect(pairs).toEqual([])
    })
    test("Simple File", async () => {
        const pairs = await journeyBars(simpleFile.file)
        expect(pairs).toEqual([['train', 1]])
    })
    test("Example File", async () => {
        const pairs = await journeyBars(exampleFile.file)
        expect(pairs).toEqual([
            ['train', 14],
            ['foot', 24],
            ['bus', 4],
            ['flight', 7],
            ['petrolCar', 6],
            ['eurostar', 4],
            ['subway', 4],
            ['taxi', 4],
            ['bike', 1],
            ['tram', 1],
            ['dieselCar', 1],
            ['coach', 3],
            ['electricScooter', 1],
            ['electricCar', 2]
        ])
    })
})

describe("Transform Tests", () => {
    test("Empty transform", () => {
        const list = []
        const transformed = transform(list, 1)
        expect(transformed).toEqual([])
    })
    test("Empty 2d transform", () => {
        const list = [[]]
        const transformed = transform(list, 1)
        expect(transformed).toEqual([])
    })
    test("One element below cutoff", () => {
        const list = [['train', 4]]
        const transformed = transform(list, 7)
        expect(transformed).toEqual([])
    })
    test("One element above cutoff", () => {
        const list = [['train', 12]]
        const transformed = transform(list, 6)
        expect(transformed).toEqual([['train', 12]])
    })
    test("Large example with edge cases", () => {
        const list = [['train', 12], ['foot', 11], ['car', 1000], ['bike', 0], ['taxi', 0], ['scooter', 10]]
        const transformed = transform(list, 11)
        expect(transformed).toEqual([['train', 12], ['foot', 11], ['car', 1000]])
    })
    test("Negative number support", () => {
        const list = [['train', -4], ['foot', -5], ['car', -6], ['bike', -1], ['taxi', 0], ['scooter', 10]]
        const transformed = transform(list, -5)
        expect(transformed).toEqual([['train', -4], ['foot', -5],['bike', -1], ['taxi', 0], ['scooter', 10]])
    })
})

describe("Predict journey bar tests", () => {
    test("Empty file", () => {
        const predBars = predictJourneyBars(emptyFile.apiResponse)
        expect(predBars).toEqual([])
    })
    test("Simple file", () => {
        const predBars = predictJourneyBars(simpleFile.apiResponse)
        expect(predBars).toEqual([['train', 1]])
    })
    test("Example file", () => {
        const predBars = predictJourneyBars(exampleFile.apiResponse)
        const expectedBars = [
            ['train', 19.90],
            ['foot', 25.30],
            ['bike', 2.10],
            ['electricScooter', 1.55],
            ['electricCar', 3.90],
            ['bus', 2.4],
            ['coach', 4],
            ['petrolCar', 1.9],
            ['flight', 1.75],
            ['taxi', 4],
            ['eurostar', 4],
            ['subway', 4],
            ['tram', 1],
            ['dieselCar', 0.20]
        ]
        // Tests that two arrays are the same to 2dp
        testTwoArraysSame2dp(expectedBars, predBars)
    })
})

describe("Emissions bar before test", () => {
    test("Empty file current emissions", async () => {
        let ems = undefined
        await emissionBarsBefore(emptyFile.file, emptyFile.apiResponse)
            .then((pairs) => ems = pairs)
        expect(ems !== undefined).toBe(true)
        expect(ems).toEqual([])
    })
    test("Simple file current emissions", async () => {
        let ems = undefined
        await emissionBarsBefore(simpleFile.file, simpleFile.apiResponse)
            .then((pairs) => ems = pairs)
        expect(ems !== undefined).toBe(true)
        // Note this list SHOULD be empty as 
        // 'train' emits less than 10 KgC02 and thus is removed
        expect(ems).toEqual([])
    })
    test("Example file current emissions", async () => {
        let ems = undefined
        await emissionBarsBefore(exampleFile.file, exampleFile.apiResponse)
            .then((pairs) => ems = pairs)
        expect(ems !== undefined).toBe(true)
        // Calculations compared to 2dp
        const expected = [
            ['train', 142.99],
            ['flight', 1445.41],
            ['petrolCar', 316.08],
            ['taxi', 17.41],
            ['dieselCar', 57.17],
            ['coach', 38.82],
            ['electricCar', 12.43]
        ]
        testTwoArraysSame2dp(expected, ems)
    })
})

describe("Emissions bar after test", () => {
    test("Empty file test", async () => {
        let ems = undefined
        await emissionBarsAfter(emptyFile.file, emptyFile.apiResponse)
            .then((pairs) => ems = pairs)
        expect(ems !== undefined).toBe(true)
        expect(ems).toEqual([])        
    })
    test("Simple file test", async () => {
        let ems = undefined
        await emissionBarsAfter(simpleFile.file, simpleFile.apiResponse)
            .then((pairs) => ems = pairs)
        expect(ems !== undefined).toBe(true)
        expect(ems).toEqual([])            
    })
    test("Example file test", async () => {
        let ems = undefined
        await emissionBarsAfter(exampleFile.file, exampleFile.apiResponse)
            .then((pairs) => ems = pairs)
        expect(ems !== undefined).toBe(true)
        /* Note this would be the full list if the transform did not exist (rounded to 2dp):
        [
            ['train', 262.85],
            ['foot', 0.00],
            ['bike', 0.00],
            ['electricScooter', 3.60],
            ['electricCar', 88.89],
            ['bus', 3.37],
            ['coach', 51.14],
            ['petrolCar', 179.44],
            ['flight', 361.35],
            ['taxi', 74.65],
            ['eurostar', 8.28],
            ['subway', 1.26],
            ['tram', 0.48],
            ['dieselCar', 11.43]
        ]
        */
        // Calculations compared to 2dp
        const expected = [
            ['train', 262.85],
            ['electricCar', 88.89],
            ['coach', 51.14],
            ['petrolCar', 179.44],
            ['flight', 361.35],
            ['taxi', 74.65],
            ['dieselCar', 11.43]
        ]
        testTwoArraysSame2dp(expected, ems)        
    })
})

/**
 * Checks that two arrays are the same to 2dp with the first field being a string
 * and the second being a real number
 */
function testTwoArraysSame2dp(arr1, arr2) {
    expect(arr1.length).toBe(arr2.length)
    for (let i = 0; i < arr2.length; i++) {
        expect(arr2[i].length).toBe(2)
        expect(arr1[i].length).toBe(2)
        expect(arr1[i][0]).toBe(arr2[i][0])
        expect(arr1[i][1].toFixed(2) === arr2[i][1].toFixed(2)).toBe(true)
    }
}