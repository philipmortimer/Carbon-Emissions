import { render, screen, waitFor, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import { View } from '../../pages/View/View'
import { getCsvFile } from '../App/app.test'
import 'jest-canvas-mock';
import {Chart} from 'chart.js/auto'

export function beforeTests() {
  beforeEach(() => {
    jest.resetAllMocks();
    // Mocks window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    // Mocks chart creation
    jest.mock('chart.js/auto', ()=> {
      return {
          Chart : jest.fn().mockImplementation((ctx, config) => { return {} })
      }
  });
  })
}

beforeTests()



describe("Policy Selector Aesthetics", () => {
    test("Policy Selector Categories all appear in view page", async () => {
        render(viewComponent(exampleFile.file, exampleFile.apiResponse))
        // Checks policy selection options all are present
        await waitFor(() => {
          expect(screen.queryByText("No domestic flights")).toBeInTheDocument()
        })
        expect(screen.queryByText("No domestic flights")).toBeInTheDocument()
        expect(screen.queryByText("Economy-class flights")).toBeInTheDocument()
        expect(screen.queryByText("Replace all ICEs with Electric cars")).toBeInTheDocument()
        expect(screen.queryByText("Train routes <300mi")).toBeInTheDocument()
        expect(screen.queryByText("50% of flights become coach and train")).toBeInTheDocument()
        expect(screen.queryByText("Replace personal cars with taxis")).toBeInTheDocument()
        expect(screen.queryByText("Electric scooters forbidden")).toBeInTheDocument()
        expect(screen.queryByText("No personal ICE vehicles")).toBeInTheDocument()
    })
})

describe("General View Aesthetics", () => {
  test("Labels present", () => {
      render(viewComponent(exampleFile.file, exampleFile.apiResponse))
      // Checks Visualisation title is present
      expect(screen.queryByText("Visualisation")).toBeInTheDocument()
      expect(screen.queryByText("Before")).toBeInTheDocument()
      expect(screen.queryByText("After")).toBeInTheDocument()
  })
})

describe("Chart Tests", () => {
  test("Graphs present", () => {
    render(viewComponent(emptyFile.file, emptyFile.apiResponse))
    // Checks graphs are present
    expect(screen.getByTestId("Journeys")).toBeInTheDocument()
    expect(screen.getByTestId("Average Predicted Journeys")).toBeInTheDocument()
    expect(screen.getByTestId("Current Emissions (KgCO2)")).toBeInTheDocument()
    expect(screen.getByTestId("Predicted Emissions (KgCO2)")).toBeInTheDocument()
  })
  test("Graphs present for multiple files", () => {
    // Note that these unit tests should be used in conjunction with manual tests for the files to verify the data 
    // is correct and reasonable
    for (let i = 0; i < fileList.length; i++) {
      render(viewComponent(fileList[i].file, fileList[i].apiResponse))
      // Checks graphs are present
      expect(screen.getByTestId("Journeys")).toBeInTheDocument()
      expect(screen.getByTestId("Average Predicted Journeys")).toBeInTheDocument()
      expect(screen.getByTestId("Current Emissions (KgCO2)")).toBeInTheDocument()
      expect(screen.getByTestId("Predicted Emissions (KgCO2)")).toBeInTheDocument()
      cleanup()
    }
  })
})

/**
 * Returns the view component JSX
 * @param {*} file The input file 
 * @param {*} apiResponse The api response
 * @returns The JSX
 */
function viewComponent(file, apiResponse) {
    return (
        <View file={file} response={apiResponse} setFile={ () => {throw new Error("Unexpected Set file call")}}/>
    );
}

// End of actual code - just CSV data now
// ************************************************************************************************
// Collection of files and corresponding API responses
export const emptyFile = {
    file: getCsvFile("empty.csv", 'origin,destination,distanceKm,departureTime,arrivalTime,transport'),
    apiResponse: {"id":"id","predictions":[],"warnings":[]}
}
export const simpleFile = {
    file: getCsvFile("valid.csv", 'origin,destination,distanceKm,departureTime,arrivalTime,transport' +
    '\nPaddington,Bristol Parkway,179.08,2022-10-14T17:48:00.000Z,2022-10-14T19:01:00.000Z,train'),
    apiResponse: {
        id: 'id',
        predictions: [
          {
            currentCarbonKgCo2e: 7.952942888820001,
            newCarbonKgCo2e: 7.952942888820001,
            alternatives: [
              {
                transport: { type: 'train' },
                probability: 1,
                carbonKgCo2e: 7.952942888820001
              }
            ],
            emissionsSavingPercentage: 0
          }],
        warnings: []
      }
};

export const exampleFile = {
    file : getCsvFile("example.csv", "origin,destination,distanceKm,departureTime,arrivalTime,transport\n" +
    "Paddington,Bristol Parkway,179.08,2022-10-14T17:48:00.000Z,2022-10-14T19:01:00.000Z,train\n" +
    ",,0.002,2022-10-14T19:01:00.000Z,2022-10-14T19:01:03.000Z,foot\n" +
    "Bristol Parkway,Bristol Temple Meads,9.536,2022-10-14T19:16:00.000Z,2022-10-14T19:28:00.000Z,train\n" +
    "Bristol Bond St,Bristol Airport,15.155631660505241,2022-10-27T02:30:00.000Z,2022-10-27T02:50:00.000Z,bus\n" +
    ",Bristol Airport (BRS),0.53,2022-10-27T02:50:00.000Z,2022-10-27T02:57:10.000Z,foot\n" +
    "BRS airport,CDG airport,458.7180121803861,2022-10-27T06:37:00.000Z,2022-10-27T07:45:00.000Z,flight\n" +
    "Paris Charles de Gaulle Airport (CDG),,0.486,2022-10-27T08:16:01.000Z,2022-10-27T08:21:59.000Z,foot\n" +
    "Tour de Contrôle / Parc Pr,Aéroport CDG 1 (Terminal 3),1.235,2022-10-27T08:22:00.000Z,2022-10-27T08:24:00.000Z,train\n" +
    ",,0.158,2022-10-27T08:24:00.000Z,2022-10-27T08:27:02.000Z,foot\n" +
    "Aéroport CDG 1 (Terminal 3),Gare du Nord,27.296,2022-10-27T08:32:00.000Z,2022-10-27T09:04:00.000Z,train\n" +
    "Bristol,,299.185,2022-10-27T00:21:31.000Z,2022-10-27T03:46:17.000Z,petrolCar\n" +
    ",,54.297,2022-10-27T03:46:17.000Z,2022-10-27T04:42:32.000Z,eurostar\n" +
    ",Paris,296.665,2022-10-27T04:42:32.000Z,2022-10-27T07:45:00.000Z,petrolCar\n" +
    "Castlehill,,0.898,2022-11-01T09:01:03.000Z,2022-11-01T09:11:00.000Z,foot\n" +
    "Edinburgh Waverley,King's Cross,630.928,2022-11-01T09:11:00.000Z,2022-11-01T13:47:00.000Z,train\n" +
    ",,0.31,2022-11-01T13:47:00.000Z,2022-11-01T13:52:09.000Z,foot\n" +
    "St Pancras,Gare du Nord,450.768,2022-11-01T14:31:00.000Z,2022-11-01T16:47:00.000Z,eurostar\n" +
    "Gare du Nord,Châtelet,2.537,2022-11-01T16:51:00.000Z,2022-11-01T16:59:00.000Z,subway\n" +
    ",Rue de Rivoli,0.6,2022-11-01T16:59:00.000Z,2022-11-01T17:06:55.000Z,foot\n" +
    "Castlehill,Edinburgh Airport (EDI),14.392,2022-11-01T05:16:37.000Z,2022-11-01T05:45:00.000Z,taxi\n" +
    "EDI airport,CDG airport,869.6469541560981,2022-11-01T07:45:00.000Z,2022-11-01T09:37:00.000Z,flight\n" +
    "Paris Charles de Gaulle Airport (CDG),Rue de Rivoli,33.851,2022-11-01T10:07:00.000Z,2022-11-01T10:47:05.000Z,taxi\n" +
    "Castlehill,,0.898,2022-11-01T13:20:03.000Z,2022-11-01T13:30:00.000Z,foot\n" +
    "Edinburgh Waverley,King's Cross,631.614,2022-11-01T13:30:00.000Z,2022-11-01T17:51:00.000Z,train\n" +
    ",,0.273,2022-11-01T17:51:00.000Z,2022-11-01T17:55:05.000Z,foot\n" +
    "St Pancras International,Rotterdam,516.946,2022-11-01T18:19:00.000Z,2022-11-01T21:32:00.000Z,eurostar\n" +
    ",,0.022,2022-11-01T21:32:00.000Z,2022-11-01T21:32:22.000Z,foot\n" +
    "Rotterdam,Hengelo,188.288,2022-11-01T21:35:00.000Z,2022-11-02T00:06:00.000Z,train\n" +
    ",,0.013,2022-11-02T00:06:00.000Z,2022-11-02T00:06:14.000Z,foot\n" +
    "Hengelo,Berlin Central Station,485.075,2022-11-02T04:34:00.000Z,2022-11-02T10:22:00.000Z,train\n" +
    "Castlehill,Edinburgh Airport (EDI),14.392,2022-11-01T05:16:37.000Z,2022-11-01T05:45:00.000Z,petrolCar\n" +
    "EDI airport,TXL airport,1143.8810195001158,2022-11-01T07:45:00.000Z,2022-11-01T10:07:00.000Z,flight\n" +
    "Straße ohne Straßennamen,Berlin,11.444,2022-11-01T10:37:00.000Z,2022-11-01T11:15:00.000Z,bike\n" +
    "London,London,27.419,2022-10-14T15:08:32.370Z,2022-10-14T15:51:48.370Z,petrolCar\n" +
    "LHR airport,EDI airport,533.415735859426,2022-10-14T17:51:48.370Z,2022-10-14T19:07:48.370Z,flight\n" +
    "Edinburgh Airport (EDI),,1.141,2022-10-14T19:41:08.000Z,2022-10-14T19:55:00.000Z,foot\n" +
    "Edinburgh Airport,St Andrew Square,13.357,2022-10-14T19:55:00.000Z,2022-10-14T20:30:00.000Z,tram\n" +
    ",Edinburgh,0.384,2022-10-14T20:30:00.000Z,2022-10-14T20:34:52.000Z,foot\n" +
    "London Bridge,,0.389,2022-10-17T06:27:02.000Z,2022-10-17T06:32:27.000Z,foot\n" +
    "London Bridge,Green Park,4.232,2022-10-17T06:32:27.000Z,2022-10-17T06:39:00.000Z,subway\n" +
    ",,0.11,2022-10-17T06:39:00.000Z,2022-10-17T06:40:51.000Z,foot\n" +
    "Green Park,Heathrow Terminals 2 & 3,24.989,2022-10-17T06:44:00.000Z,2022-10-17T07:33:00.000Z,subway\n" +
    ",London,0.413,2022-10-17T07:33:00.000Z,2022-10-17T07:38:41.000Z,foot\n" +
    "LHR airport,GLA airport,554.6666171812639,2022-10-17T09:41:00.000Z,2022-10-17T11:00:00.000Z,flight\n" +
    "Glasgow Airport (GLA),Glasgow,18.003,2022-10-17T11:30:00.000Z,2022-10-17T11:49:17.000Z,taxi\n" +
    "Bristol,Manchester,269.853,2022-10-20T18:00:00.000Z,2022-10-20T21:05:15.000Z,dieselCar\n" +
    "Bristol Bond St,Bristol Airport,15.155631660505241,2022-10-20T14:30:00.000Z,2022-10-20T15:05:00.000Z,bus\n" +
    ",Bristol Airport (BRS),0.53,2022-10-20T15:05:00.000Z,2022-10-20T15:12:10.000Z,foot\n" +
    "BRS airport,MAD airport,1214.1176565347682,2022-10-20T18:00:00.000Z,2022-10-20T20:29:00.000Z,flight\n" +
    "Adolfo Suárez Madrid–Barajas Airport (MAD),Madrid,27.809,2022-10-20T20:59:00.000Z,2022-10-20T21:27:37.000Z,taxi\n" +
    "Victoria Coach,Cabot Circus (S4),195.60607071977284,2022-10-14T18:00:00.000Z,2022-10-14T20:55:00.000Z,coach\n" +
    "Bond Street,St Augustine's Parade,0.99,2022-10-14T20:55:00.000Z,2022-10-14T20:58:03.000Z,electricScooter\n" +
    "Bristol Bond St,Bristol Airport,15.155631660505241,2022-10-20T14:30:00.000Z,2022-10-20T15:05:00.000Z,bus\n" +
    ",Bristol Airport (BRS),0.53,2022-10-20T15:05:00.000Z,2022-10-20T15:12:10.000Z,foot\n" +
    "BRS airport,AMS airport,524.3634257242004,2022-10-20T18:00:00.000Z,2022-10-20T19:15:00.000Z,flight\n" +
    "Amsterdam Airport Schiphol (AMS),,0.218,2022-10-20T19:46:08.000Z,2022-10-20T19:48:56.000Z,foot\n" +
    "Schiphol Airport,Amsterdam South,8.778,2022-10-20T19:49:00.000Z,2022-10-20T19:55:00.000Z,train\n" +
    "London,Bristol,189.491,2022-10-22T15:26:54.000Z,2022-10-22T17:45:00.000Z,petrolCar\n" +
    "Charing Cross,Wilson's Road,7.263,2022-10-22T15:14:41.000Z,2022-10-22T15:28:28.000Z,electricCar\n" +
    "Wilson's Road,,182.078,2022-10-22T15:42:59.000Z,2022-10-22T17:45:00.000Z,electricCar\n" +
    "Paddington,Bristol Parkway,179.126,2022-10-22T15:48:00.000Z,2022-10-22T17:03:00.000Z,train\n" +
    ",,0.002,2022-10-22T17:03:00.000Z,2022-10-22T17:03:03.000Z,foot\n" +
    "Bristol Parkway,Bristol Temple Meads,9.536,2022-10-22T17:17:00.000Z,2022-10-22T17:28:00.000Z,train\n" +
    "Bristol Temple Meads,Doncaster,298.432,2022-10-26T18:35:00.000Z,2022-10-26T22:07:00.000Z,train\n" +
    ",,0.021,2022-10-26T22:07:00.000Z,2022-10-26T22:07:22.000Z,foot\n" +
    "Doncaster,Edinburgh Waverley,380.956,2022-10-26T22:52:00.000Z,2022-10-27T07:07:00.000Z,train\n" +
    "Bristol,Edinburgh,613.981,2022-10-27T01:07:34.000Z,2022-10-27T07:45:00.000Z,petrolCar\n" +
    "Bristol,Edinburgh,757.6308665973514,2022-10-26T18:25:00.000Z,2022-10-27T07:05:00.000Z,coach\n" +
    "Bristol Temple Meads,Paddington,189.778,2022-10-26T21:00:00.000Z,2022-10-26T22:56:00.000Z,train\n" +
    ",,0.328,2022-10-26T22:56:00.000Z,2022-10-26T23:01:30.000Z,foot\n" +
    "Paddington,King's Cross St. Pancras,4.243,2022-10-26T23:04:50.000Z,2022-10-26T23:16:00.000Z,subway\n" +
    ",,0.372,2022-10-26T23:16:00.000Z,2022-10-26T23:21:35.000Z,foot\n" +
    "St Pancras,Gare du Nord,450.768,2022-10-27T04:59:00.000Z,2022-10-27T07:17:00.000Z,eurostar\n" +
    "Victoria Coach,Cabot Circus (S4),195.60607071977284,2022-10-14T18:00:00.000Z,2022-10-14T20:55:00.000Z,coach\n" +
    ",,0.527,2022-10-14T20:55:00.000Z,2022-10-14T21:01:30.000Z,foot\n" +
    "Union Street,The Centre (C7),0.774,2022-10-14T21:07:30.000Z,2022-10-14T21:11:00.000Z,bus"),
    apiResponse: 
        {"id":"id","predictions":[{"currentCarbonKgCo2e":7.952942888820001,"newCarbonKgCo2e":7.952942888820001,"alternatives":[{"transport":{"type":"train"},"probability":1,"carbonKgCo2e":7.952942888820001}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":0,"newCarbonKgCo2e":0,"alternatives":[{"transport":{"type":"foot"},"probability":1,"carbonKgCo2e":0}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":0.42349376000000005,"newCarbonKgCo2e":0.42349376000000005,"alternatives":[{"transport":{"type":"train"},"probability":1,"carbonKgCo2e":0.42349376000000005}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":1.8404999500800001,"newCarbonKgCo2e":1.2303342057600002,"alternatives":[{"transport":{"type":"foot"},"probability":0.15,"carbonKgCo2e":0},{"transport":{"type":"bike"},"probability":0.1,"carbonKgCo2e":0},{"transport":{"type":"electricScooter"},"probability":0.05,"carbonKgCo2e":0.53044712},{"transport":{"type":"electricCar"},"probability":0.1,"carbonKgCo2e":0.99511879712},{"transport":{"type":"bus"},"probability":0.6,"carbonKgCo2e":1.8404999500800001}],"emissionsSavingPercentage":33.15217391304347},{"currentCarbonKgCo2e":0,"newCarbonKgCo2e":0,"alternatives":[{"transport":{"type":"foot"},"probability":1,"carbonKgCo2e":0}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":125.12910095004,"newCarbonKgCo2e":56.290893501843,"alternatives":[{"transport":{"type":"coach"},"probability":0.05,"carbonKgCo2e":15.500081828219999},{"transport":{"type":"train"},"probability":0.4,"carbonKgCo2e":20.37166717938},{"transport":{"type":"electricCar"},"probability":0.2,"carbonKgCo2e":30.119425061879998},{"transport":{"type":"petrolCar"},"probability":0.1,"carbonKgCo2e":100.61062288794},{"transport":{"type":"flight"},"probability":0.25,"carbonKgCo2e":125.12910095004}],"emissionsSavingPercentage":55.01374734218051},{"currentCarbonKgCo2e":0,"newCarbonKgCo2e":0,"alternatives":[{"transport":{"type":"foot"},"probability":1,"carbonKgCo2e":0}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":0.05484635000000001,"newCarbonKgCo2e":0.05484635000000001,"alternatives":[{"transport":{"type":"train"},"probability":1,"carbonKgCo2e":0.05484635000000001}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":0,"newCarbonKgCo2e":0,"alternatives":[{"transport":{"type":"foot"},"probability":1,"carbonKgCo2e":0}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":1.21221536,"newCarbonKgCo2e":1.21221536,"alternatives":[{"transport":{"type":"train"},"probability":1,"carbonKgCo2e":1.21221536}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":65.62024561134,"newCarbonKgCo2e":31.178218234078997,"alternatives":[{"transport":{"type":"foot"},"probability":0.05,"carbonKgCo2e":0},{"transport":{"type":"bike"},"probability":0.05,"carbonKgCo2e":0},{"transport":{"type":"electricScooter"},"probability":0.05,"carbonKgCo2e":10.471474930000001},{"transport":{"type":"electricCar"},"probability":0.1,"carbonKgCo2e":19.64448696868},{"transport":{"type":"taxi"},"probability":0.2,"carbonKgCo2e":55.37315942984},{"transport":{"type":"coach"},"probability":0.05,"carbonKgCo2e":10.109461082420001},{"transport":{"type":"train"},"probability":0.3,"carbonKgCo2e":13.286805761180002},{"transport":{"type":"petrolCar"},"probability":0.19999999999999996,"carbonKgCo2e":65.62024561134}],"emissionsSavingPercentage":52.486891898053166},{"currentCarbonKgCo2e":0.30514914562,"newCarbonKgCo2e":0.30514914562,"alternatives":[{"transport":{"type":"eurostar"},"probability":1,"carbonKgCo2e":0.30514914562}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":65.06753642397,"newCarbonKgCo2e":30.915608920394497,"alternatives":[{"transport":{"type":"foot"},"probability":0.05,"carbonKgCo2e":0},{"transport":{"type":"bike"},"probability":0.05,"carbonKgCo2e":0},{"transport":{"type":"electricScooter"},"probability":0.05,"carbonKgCo2e":10.383275315},{"transport":{"type":"electricCar"},"probability":0.1,"carbonKgCo2e":19.47902449094},{"transport":{"type":"taxi"},"probability":0.2,"carbonKgCo2e":54.90675986572},{"transport":{"type":"coach"},"probability":0.05,"carbonKgCo2e":10.02431065411},{"transport":{"type":"train"},"probability":0.3,"carbonKgCo2e":13.17489304969},{"transport":{"type":"petrolCar"},"probability":0.19999999999999996,"carbonKgCo2e":65.06753642397}],"emissionsSavingPercentage":52.486891898053166},{"currentCarbonKgCo2e":0,"newCarbonKgCo2e":0,"alternatives":[{"transport":{"type":"foot"},"probability":1,"carbonKgCo2e":0}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":28.019511547390007,"newCarbonKgCo2e":28.019511547390007,"alternatives":[{"transport":{"type":"train"},"probability":1,"carbonKgCo2e":28.019511547390007}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":0,"newCarbonKgCo2e":0,"alternatives":[{"transport":{"type":"foot"},"probability":1,"carbonKgCo2e":0}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":2.5333161881,"newCarbonKgCo2e":2.5333161881,"alternatives":[{"transport":{"type":"eurostar"},"probability":1,"carbonKgCo2e":2.5333161881}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":0.08892185,"newCarbonKgCo2e":0.08892185,"alternatives":[{"transport":{"type":"subway"},"probability":1,"carbonKgCo2e":0.08892185}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":0,"newCarbonKgCo2e":0,"alternatives":[{"transport":{"type":"foot"},"probability":1,"carbonKgCo2e":0}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":2.66367136,"newCarbonKgCo2e":1.8920514760000002,"alternatives":[{"transport":{"type":"foot"},"probability":0.05,"carbonKgCo2e":0},{"transport":{"type":"bike"},"probability":0.05,"carbonKgCo2e":0},{"transport":{"type":"electricScooter"},"probability":0.05,"carbonKgCo2e":0.5037200000000001},{"transport":{"type":"electricCar"},"probability":0.05,"carbonKgCo2e":0.9449787199999999},{"transport":{"type":"coach"},"probability":0.05,"carbonKgCo2e":0.48630568},{"transport":{"type":"train"},"probability":0.1,"carbonKgCo2e":0.63914872},{"transport":{"type":"taxi"},"probability":0.65,"carbonKgCo2e":2.66367136}],"emissionsSavingPercentage":28.968283985303643},{"currentCarbonKgCo2e":237.22230129494002,"newCarbonKgCo2e":106.71742382123551,"alternatives":[{"transport":{"type":"coach"},"probability":0.05,"carbonKgCo2e":29.385371217670002},{"transport":{"type":"train"},"probability":0.4,"carbonKgCo2e":38.62102207093},{"transport":{"type":"electricCar"},"probability":0.2,"carbonKgCo2e":57.101020247179996},{"transport":{"type":"petrolCar"},"probability":0.1,"carbonKgCo2e":190.73967058809},{"transport":{"type":"flight"},"probability":0.25,"carbonKgCo2e":237.22230129494002}],"emissionsSavingPercentage":55.01374734218051},{"currentCarbonKgCo2e":6.26514345016,"newCarbonKgCo2e":4.450238903431,"alternatives":[{"transport":{"type":"foot"},"probability":0.05,"carbonKgCo2e":0},{"transport":{"type":"bike"},"probability":0.05,"carbonKgCo2e":0},{"transport":{"type":"electricScooter"},"probability":0.05,"carbonKgCo2e":1.1847850700000002},{"transport":{"type":"electricCar"},"probability":0.05,"carbonKgCo2e":2.22265679132},{"transport":{"type":"coach"},"probability":0.05,"carbonKgCo2e":1.1438253575800001},{"transport":{"type":"train"},"probability":0.1,"carbonKgCo2e":1.5033229988200003},{"transport":{"type":"taxi"},"probability":0.65,"carbonKgCo2e":6.26514345016}],"emissionsSavingPercentage":28.968283985303657},{"currentCarbonKgCo2e":0,"newCarbonKgCo2e":0,"alternatives":[{"transport":{"type":"foot"},"probability":1,"carbonKgCo2e":0}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":28.049978361740003,"newCarbonKgCo2e":28.049978361740003,"alternatives":[{"transport":{"type":"train"},"probability":1,"carbonKgCo2e":28.049978361740003}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":0,"newCarbonKgCo2e":0,"alternatives":[{"transport":{"type":"foot"},"probability":1,"carbonKgCo2e":0}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":2.9052364300799995,"newCarbonKgCo2e":2.9052364300799995,"alternatives":[{"transport":{"type":"eurostar"},"probability":1,"carbonKgCo2e":2.9052364300799995}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":0,"newCarbonKgCo2e":0,"alternatives":[{"transport":{"type":"foot"},"probability":1,"carbonKgCo2e":0}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":8.36186981354,"newCarbonKgCo2e":8.36186981354,"alternatives":[{"transport":{"type":"train"},"probability":1,"carbonKgCo2e":8.36186981354}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":0,"newCarbonKgCo2e":0,"alternatives":[{"transport":{"type":"foot"},"probability":1,"carbonKgCo2e":0}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":21.54218128292,"newCarbonKgCo2e":21.54218128292,"alternatives":[{"transport":{"type":"train"},"probability":1,"carbonKgCo2e":21.54218128292}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":3.1565973599999997,"newCarbonKgCo2e":1.4997975159999999,"alternatives":[{"transport":{"type":"foot"},"probability":0.05,"carbonKgCo2e":0},{"transport":{"type":"bike"},"probability":0.05,"carbonKgCo2e":0},{"transport":{"type":"electricScooter"},"probability":0.05,"carbonKgCo2e":0.5037200000000001},{"transport":{"type":"electricCar"},"probability":0.1,"carbonKgCo2e":0.9449787199999999},{"transport":{"type":"taxi"},"probability":0.2,"carbonKgCo2e":2.66367136},{"transport":{"type":"coach"},"probability":0.05,"carbonKgCo2e":0.48630568},{"transport":{"type":"train"},"probability":0.3,"carbonKgCo2e":0.63914872},{"transport":{"type":"petrolCar"},"probability":0.19999999999999996,"carbonKgCo2e":3.1565973599999997}],"emissionsSavingPercentage":52.48689189805316},{"currentCarbonKgCo2e":312.02785399718005,"newCarbonKgCo2e":140.36963876194352,"alternatives":[{"transport":{"type":"coach"},"probability":0.05,"carbonKgCo2e":38.651738347990005},{"transport":{"type":"train"},"probability":0.4,"carbonKgCo2e":50.79975436621001},{"transport":{"type":"electricCar"},"probability":0.2,"carbonKgCo2e":75.10722521246},{"transport":{"type":"petrolCar"},"probability":0.1,"carbonKgCo2e":250.88741556273},{"transport":{"type":"flight"},"probability":0.25,"carbonKgCo2e":312.02785399718005}],"emissionsSavingPercentage":55.01374734218051},{"currentCarbonKgCo2e":0,"newCarbonKgCo2e":0,"alternatives":[{"transport":{"type":"bike"},"probability":1,"carbonKgCo2e":0}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":6.01380948933,"newCarbonKgCo2e":2.8573478037105,"alternatives":[{"transport":{"type":"foot"},"probability":0.05,"carbonKgCo2e":0},{"transport":{"type":"bike"},"probability":0.05,"carbonKgCo2e":0},{"transport":{"type":"electricScooter"},"probability":0.05,"carbonKgCo2e":0.9596650350000001},{"transport":{"type":"electricCar"},"probability":0.1,"carbonKgCo2e":1.80033160566},{"transport":{"type":"taxi"},"probability":0.2,"carbonKgCo2e":5.07470870508},{"transport":{"type":"coach"},"probability":0.05,"carbonKgCo2e":0.92648804379},{"transport":{"type":"train"},"probability":0.3,"carbonKgCo2e":1.21767783441},{"transport":{"type":"petrolCar"},"probability":0.19999999999999996,"carbonKgCo2e":6.01380948933}],"emissionsSavingPercentage":52.486891898053166},{"currentCarbonKgCo2e":145.5051373738,"newCarbonKgCo2e":65.45730872908501,"alternatives":[{"transport":{"type":"coach"},"probability":0.05,"carbonKgCo2e":18.0241168409},{"transport":{"type":"train"},"probability":0.4,"carbonKgCo2e":23.688991681100003},{"transport":{"type":"electricCar"},"probability":0.2,"carbonKgCo2e":35.0240755186},{"transport":{"type":"petrolCar"},"probability":0.1,"carbonKgCo2e":116.9940676743},{"transport":{"type":"flight"},"probability":0.25,"carbonKgCo2e":145.5051373738}],"emissionsSavingPercentage":55.01374734218051},{"currentCarbonKgCo2e":0,"newCarbonKgCo2e":0,"alternatives":[{"transport":{"type":"foot"},"probability":1,"carbonKgCo2e":0}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":0.48165342,"newCarbonKgCo2e":0.48165342,"alternatives":[{"transport":{"type":"tram"},"probability":1,"carbonKgCo2e":0.48165342}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":0,"newCarbonKgCo2e":0,"alternatives":[{"transport":{"type":"foot"},"probability":1,"carbonKgCo2e":0}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":0,"newCarbonKgCo2e":0,"alternatives":[{"transport":{"type":"foot"},"probability":1,"carbonKgCo2e":0}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":0.1483316,"newCarbonKgCo2e":0.1483316,"alternatives":[{"transport":{"type":"subway"},"probability":1,"carbonKgCo2e":0.1483316}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":0,"newCarbonKgCo2e":0,"alternatives":[{"transport":{"type":"foot"},"probability":1,"carbonKgCo2e":0}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":0.87586445,"newCarbonKgCo2e":0.87586445,"alternatives":[{"transport":{"type":"subway"},"probability":1,"carbonKgCo2e":0.87586445}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":0,"newCarbonKgCo2e":0,"alternatives":[{"transport":{"type":"foot"},"probability":1,"carbonKgCo2e":0}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":151.30196224028,"newCarbonKgCo2e":68.065083009651,"alternatives":[{"transport":{"type":"coach"},"probability":0.05,"carbonKgCo2e":18.74218529254},{"transport":{"type":"train"},"probability":0.4,"carbonKgCo2e":24.63274486066},{"transport":{"type":"electricCar"},"probability":0.2,"carbonKgCo2e":36.419410663159994},{"transport":{"type":"petrolCar"},"probability":0.1,"carbonKgCo2e":121.65503108057999},{"transport":{"type":"flight"},"probability":0.25,"carbonKgCo2e":151.30196224028}],"emissionsSavingPercentage":55.01374734218051},{"currentCarbonKgCo2e":3.33199524,"newCarbonKgCo2e":2.3667733965,"alternatives":[{"transport":{"type":"foot"},"probability":0.05,"carbonKgCo2e":0},{"transport":{"type":"bike"},"probability":0.05,"carbonKgCo2e":0},{"transport":{"type":"electricScooter"},"probability":0.05,"carbonKgCo2e":0.630105},{"transport":{"type":"electricCar"},"probability":0.05,"carbonKgCo2e":1.18207698},{"transport":{"type":"coach"},"probability":0.05,"carbonKgCo2e":0.60832137},{"transport":{"type":"train"},"probability":0.1,"carbonKgCo2e":0.7995132300000001},{"transport":{"type":"taxi"},"probability":0.65,"carbonKgCo2e":3.33199524}],"emissionsSavingPercentage":28.968283985303643},{"currentCarbonKgCo2e":57.172173135827585,"newCarbonKgCo2e":27.718578804632017,"alternatives":[{"transport":{"type":"foot"},"probability":0.05,"carbonKgCo2e":0},{"transport":{"type":"bike"},"probability":0.05,"carbonKgCo2e":0},{"transport":{"type":"electricScooter"},"probability":0.05,"carbonKgCo2e":9.444854895},{"transport":{"type":"electricCar"},"probability":0.1,"carbonKgCo2e":17.71854778302},{"transport":{"type":"taxi"},"probability":0.2,"carbonKgCo2e":49.944392684760004},{"transport":{"type":"coach"},"probability":0.05,"carbonKgCo2e":9.118332768630001},{"transport":{"type":"train"},"probability":0.3,"carbonKgCo2e":11.984171596770002},{"transport":{"type":"dieselCar"},"probability":0.19999999999999996,"carbonKgCo2e":57.172173135827585}],"emissionsSavingPercentage":51.51736013465988},{"currentCarbonKgCo2e":1.8404999500800001,"newCarbonKgCo2e":1.2303342057600002,"alternatives":[{"transport":{"type":"foot"},"probability":0.15,"carbonKgCo2e":0},{"transport":{"type":"bike"},"probability":0.1,"carbonKgCo2e":0},{"transport":{"type":"electricScooter"},"probability":0.05,"carbonKgCo2e":0.53044712},{"transport":{"type":"electricCar"},"probability":0.1,"carbonKgCo2e":0.99511879712},{"transport":{"type":"bus"},"probability":0.6,"carbonKgCo2e":1.8404999500800001}],"emissionsSavingPercentage":33.15217391304347},{"currentCarbonKgCo2e":0,"newCarbonKgCo2e":0,"alternatives":[{"transport":{"type":"foot"},"probability":1,"carbonKgCo2e":0}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":331.18701965928005,"newCarbonKgCo2e":148.98862943382602,"alternatives":[{"transport":{"type":"coach"},"probability":0.05,"carbonKgCo2e":41.025036272040005},{"transport":{"type":"train"},"probability":0.4,"carbonKgCo2e":53.91896599116001},{"transport":{"type":"electricCar"},"probability":0.2,"carbonKgCo2e":79.71896660616},{"transport":{"type":"petrolCar"},"probability":0.1,"carbonKgCo2e":266.29242987708},{"transport":{"type":"flight"},"probability":0.25,"carbonKgCo2e":331.18701965928005}],"emissionsSavingPercentage":55.01374734218051},{"currentCarbonKgCo2e":5.14688972,"newCarbonKgCo2e":3.6559240895,"alternatives":[{"transport":{"type":"foot"},"probability":0.05,"carbonKgCo2e":0},{"transport":{"type":"bike"},"probability":0.05,"carbonKgCo2e":0},{"transport":{"type":"electricScooter"},"probability":0.05,"carbonKgCo2e":0.9733150000000002},{"transport":{"type":"electricCar"},"probability":0.05,"carbonKgCo2e":1.82593894},{"transport":{"type":"coach"},"probability":0.05,"carbonKgCo2e":0.93966611},{"transport":{"type":"train"},"probability":0.1,"carbonKgCo2e":1.2349976900000001},{"transport":{"type":"taxi"},"probability":0.65,"carbonKgCo2e":5.14688972}],"emissionsSavingPercentage":28.96828398530365},{"currentCarbonKgCo2e":6.60952890256,"newCarbonKgCo2e":6.60952890256,"alternatives":[{"transport":{"type":"coach"},"probability":1,"carbonKgCo2e":6.60952890256}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":0.03465,"newCarbonKgCo2e":0.024255,"alternatives":[{"transport":{"type":"foot"},"probability":0.15,"carbonKgCo2e":0},{"transport":{"type":"bike"},"probability":0.15,"carbonKgCo2e":0},{"transport":{"type":"electricScooter"},"probability":0.7,"carbonKgCo2e":0.03465}],"emissionsSavingPercentage":30.000000000000004},{"currentCarbonKgCo2e":1.8404999500800001,"newCarbonKgCo2e":1.2303342057600002,"alternatives":[{"transport":{"type":"foot"},"probability":0.15,"carbonKgCo2e":0},{"transport":{"type":"bike"},"probability":0.1,"carbonKgCo2e":0},{"transport":{"type":"electricScooter"},"probability":0.05,"carbonKgCo2e":0.53044712},{"transport":{"type":"electricCar"},"probability":0.1,"carbonKgCo2e":0.99511879712},{"transport":{"type":"bus"},"probability":0.6,"carbonKgCo2e":1.8404999500800001}],"emissionsSavingPercentage":33.15217391304347},{"currentCarbonKgCo2e":0,"newCarbonKgCo2e":0,"alternatives":[{"transport":{"type":"foot"},"probability":1,"carbonKgCo2e":0}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":143.03584907034,"newCarbonKgCo2e":64.34646845404049,"alternatives":[{"transport":{"type":"coach"},"probability":0.05,"carbonKgCo2e":17.718239387369998},{"transport":{"type":"train"},"probability":0.4,"carbonKgCo2e":23.28697872723},{"transport":{"type":"electricCar"},"probability":0.2,"carbonKgCo2e":34.42970104097999},{"transport":{"type":"petrolCar"},"probability":0.1,"carbonKgCo2e":115.00862517998999},{"transport":{"type":"flight"},"probability":0.25,"carbonKgCo2e":143.03584907034}],"emissionsSavingPercentage":55.01374734218052},{"currentCarbonKgCo2e":0,"newCarbonKgCo2e":0,"alternatives":[{"transport":{"type":"foot"},"probability":1,"carbonKgCo2e":0}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":0.38983098000000005,"newCarbonKgCo2e":0.38983098000000005,"alternatives":[{"transport":{"type":"train"},"probability":1,"carbonKgCo2e":0.38983098000000005}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":41.56106037201,"newCarbonKgCo2e":19.7469515428685,"alternatives":[{"transport":{"type":"foot"},"probability":0.05,"carbonKgCo2e":0},{"transport":{"type":"bike"},"probability":0.05,"carbonKgCo2e":0},{"transport":{"type":"electricScooter"},"probability":0.05,"carbonKgCo2e":6.632184895},{"transport":{"type":"electricCar"},"probability":0.1,"carbonKgCo2e":12.44197886302},{"transport":{"type":"taxi"},"probability":0.2,"carbonKgCo2e":35.07099372476},{"transport":{"type":"coach"},"probability":0.05,"carbonKgCo2e":6.40290078863},{"transport":{"type":"train"},"probability":0.3,"carbonKgCo2e":8.41529517677},{"transport":{"type":"petrolCar"},"probability":0.19999999999999996,"carbonKgCo2e":41.56106037201}],"emissionsSavingPercentage":52.48689189805316},{"currentCarbonKgCo2e":0.47688857999999995,"newCarbonKgCo2e":0.40787918549999996,"alternatives":[{"transport":{"type":"electricScooter"},"probability":0.05,"carbonKgCo2e":0.254205},{"transport":{"type":"coach"},"probability":0.05,"carbonKgCo2e":0.24541677},{"transport":{"type":"train"},"probability":0.3,"carbonKgCo2e":0.32254983000000004},{"transport":{"type":"electricCar"},"probability":0.6,"carbonKgCo2e":0.47688857999999995}],"emissionsSavingPercentage":14.470758452634785},{"currentCarbonKgCo2e":11.955241676979998,"newCarbonKgCo2e":10.225227531475499,"alternatives":[{"transport":{"type":"electricScooter"},"probability":0.05,"carbonKgCo2e":6.3727301050000005},{"transport":{"type":"coach"},"probability":0.05,"carbonKgCo2e":6.15241572137},{"transport":{"type":"train"},"probability":0.3,"carbonKgCo2e":8.086084113230001},{"transport":{"type":"electricCar"},"probability":0.6,"carbonKgCo2e":11.955241676979998}],"emissionsSavingPercentage":14.470758452634785},{"currentCarbonKgCo2e":7.95498597087,"newCarbonKgCo2e":7.95498597087,"alternatives":[{"transport":{"type":"train"},"probability":1,"carbonKgCo2e":7.95498597087}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":0,"newCarbonKgCo2e":0,"alternatives":[{"transport":{"type":"foot"},"probability":1,"carbonKgCo2e":0}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":0.42349376000000005,"newCarbonKgCo2e":0.42349376000000005,"alternatives":[{"transport":{"type":"train"},"probability":1,"carbonKgCo2e":0.42349376000000005}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":13.253365430870002,"newCarbonKgCo2e":13.253365430870002,"alternatives":[{"transport":{"type":"train"},"probability":1,"carbonKgCo2e":13.253365430870002}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":0,"newCarbonKgCo2e":0,"alternatives":[{"transport":{"type":"foot"},"probability":1,"carbonKgCo2e":0}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":16.91825569354,"newCarbonKgCo2e":16.91825569354,"alternatives":[{"transport":{"type":"train"},"probability":1,"carbonKgCo2e":16.91825569354}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":134.66445667794,"newCarbonKgCo2e":63.98326887628899,"alternatives":[{"transport":{"type":"foot"},"probability":0.05,"carbonKgCo2e":0},{"transport":{"type":"bike"},"probability":0.05,"carbonKgCo2e":0},{"transport":{"type":"electricScooter"},"probability":0.05,"carbonKgCo2e":21.48933563},{"transport":{"type":"electricCar"},"probability":0.1,"carbonKgCo2e":40.313993641879996},{"transport":{"type":"taxi"},"probability":0.2,"carbonKgCo2e":113.63560681143998},{"transport":{"type":"coach"},"probability":0.05,"carbonKgCo2e":20.74641859822},{"transport":{"type":"train"},"probability":0.3,"carbonKgCo2e":27.26689700938},{"transport":{"type":"petrolCar"},"probability":0.19999999999999996,"carbonKgCo2e":134.66445667794}],"emissionsSavingPercentage":52.486891898053166},{"currentCarbonKgCo2e":25.60034672561,"newCarbonKgCo2e":25.60034672561,"alternatives":[{"transport":{"type":"coach"},"probability":1,"carbonKgCo2e":25.60034672561}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":8.42804098,"newCarbonKgCo2e":8.42804098,"alternatives":[{"transport":{"type":"train"},"probability":1,"carbonKgCo2e":8.42804098}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":0,"newCarbonKgCo2e":0,"alternatives":[{"transport":{"type":"foot"},"probability":1,"carbonKgCo2e":0}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":0.14871715,"newCarbonKgCo2e":0.14871715,"alternatives":[{"transport":{"type":"subway"},"probability":1,"carbonKgCo2e":0.14871715}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":0,"newCarbonKgCo2e":0,"alternatives":[{"transport":{"type":"foot"},"probability":1,"carbonKgCo2e":0}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":2.5333161881,"newCarbonKgCo2e":2.5333161881,"alternatives":[{"transport":{"type":"eurostar"},"probability":1,"carbonKgCo2e":2.5333161881}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":6.60952890256,"newCarbonKgCo2e":6.60952890256,"alternatives":[{"transport":{"type":"coach"},"probability":1,"carbonKgCo2e":6.60952890256}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":0,"newCarbonKgCo2e":0,"alternatives":[{"transport":{"type":"foot"},"probability":1,"carbonKgCo2e":0}],"emissionsSavingPercentage":0},{"currentCarbonKgCo2e":0.09399456,"newCarbonKgCo2e":0.06283332,"alternatives":[{"transport":{"type":"foot"},"probability":0.15,"carbonKgCo2e":0},{"transport":{"type":"bike"},"probability":0.1,"carbonKgCo2e":0},{"transport":{"type":"electricScooter"},"probability":0.05,"carbonKgCo2e":0.027090000000000003},{"transport":{"type":"electricCar"},"probability":0.1,"carbonKgCo2e":0.05082084},{"transport":{"type":"bus"},"probability":0.6,"carbonKgCo2e":0.09399456}],"emissionsSavingPercentage":33.152173913043484}],"warnings":[]}
};

export const fileList = [emptyFile, simpleFile, exampleFile];