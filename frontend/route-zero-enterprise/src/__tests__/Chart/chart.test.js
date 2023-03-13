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
    test("Single element list returns correct tally", () => {
        const list = ['train']
        const map = tallyList(list)
        const expectedMap = {'train': 1}
        expect(JSON.stringify(map) === JSON.stringify(expectedMap)).toBe(true);        
    })
    test("Multiple instances of single type of instance sum up", () => {
        const list = ['train', 'train', 'train', 'train']
        const map = tallyList(list)
        const expectedMap = {'train': 4}
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