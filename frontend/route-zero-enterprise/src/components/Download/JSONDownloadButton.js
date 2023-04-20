import React from 'react'  ;
import Button from 'react-bootstrap/Button'  ;
export const JSONDownloadButton = (props) => {
  
    const downloadTxtFile = () =>  {
    // text content
    const texts = ["[\n" +
        " {\n" +
          '  "origin": "Paddington",\n'    +
          '  "destination": "Bristol Parkway",\n'   +
          '  "distanceKm": "179.08",\n'   +
          '  "departureTime": "2022-10-14T17:48:00.000Z",\n'   +
          '  "arrivalTime": "2022-10-14T19:01:00.000Z",\n'   +
          '  "transport": "train"\n'   +
        '  },\n'   +
        " {\n" +
          '  "origin": "",\n'   +
          '  "destination": "",\n'   +
          '  "distanceKm": "0.002",\n'   +
          '  "departureTime": "2022-10-14T19:01:00.000Z",\n'   +
          '  "arrivalTime": "2022-10-14T19:01:03.000Z",\n'   +
          '  "transport": "foot"\n'   +
        '  },\n'   +
        " {\n" +
          '  "origin": "",\n'   +
          '  "destination": "",\n'   +
          '  "distanceKm": "0.022",\n'   +
          '  "departureTime": "2022-11-01T21:32:00.000Z",\n'   +
          '  "arrivalTime": "2022-11-01T21:32:22.000Z",\n'   +
          '  "transport": "foot"\n'   +
        '  },\n'   +
        " {\n" +
          '  "origin": "Rotterdam",\n'   +
          '  "destination": "Hengelo",\n'   +
          '  "distanceKm": "188.288",\n'   +
          '  "departureTime": "2022-11-01T21:35:00.000Z",\n'   +
          '  "arrivalTime": "2022-11-02T00:06:00.000Z",\n'   +
          '  "transport": "train"\n'   +
        '  },\n'   +
        " {\n" +
          '  "origin": "",\n'   +
          '  "destination": "",\n'   +
          '  "distanceKm": "0.013",\n'   +
          '  "departureTime": "2022-11-02T00:06:00.000Z",\n'   +
          '  "arrivalTime": "2022-11-02T00:06:14.000Z",\n'   +
          '  "transport": "foot"\n'   +
        '  },\n'   +
        " {\n" +
          '  "origin": "Hengelo",\n'   +
          '  "destination": "Berlin Central Station",\n'   +
          '  "distanceKm": "485.075",\n'   +
          '  "departureTime": "2022-11-02T04:34:00.000Z",\n'   +
          '  "arrivalTime": "2022-11-02T10:22:00.000Z",\n'   +
          '  "transport": "train"\n'   +
        '  },\n'   +
        " {\n" +
          '  "origin": "Castlehill",\n'   +
          '  "destination": "Edinburgh Airport (EDI)",\n'   +
          '  "distanceKm": "14.392",\n'   +
          '  "departureTime": "2022-11-01T05:16:37.000Z",\n'   +
          '  "arrivalTime": "2022-11-01T05:45:00.000Z",\n'   +
          '  "transport": "petrolCar"\n'   +
        '  },\n'   +
        " {\n" +
          '  "origin": "Stra√üe ohne Stra√üennamen",\n'   +
          '  "destination": "Berlin",\n'   +
          '  "distanceKm": "11.444",\n'   +
          '  "departureTime": "2022-11-01T10:37:00.000Z",\n'   +
          '  "arrivalTime": "2022-11-01T11:15:00.000Z",\n'   +
          '  "transport": "bike"\n'   +
        '  },\n'   +
        " {\n" +
          '  "origin": "London",\n'   +
          '  "destination": "Paddington London",\n'   +
          '  "distanceKm": "27.419",\n'   +
          '  "departureTime": "2022-10-14T15:08:32.370Z",\n'   +
          '  "arrivalTime": "2022-10-14T15:51:48.370Z",\n'   +
          '  "transport": "petrolCar"\n'   +
        '  },\n'   +
        " {\n" +
          '  "origin": "Edinburgh Airport (EDI)",\n'   +
          '  "destination": "",\n'   +
          '  "distanceKm": "1.141",\n'   +
          '  "departureTime": "2022-10-14T19:41:08.000Z",\n'   +
          '  "arrivalTime": "2022-10-14T19:55:00.000Z",\n'   +
          '  "transport": "foot"\n'   +
        '  },\n'   +
        " {\n" +
          '  "origin": "Edinburgh Airport",\n'   +
          '  "destination": "St Andrew Square",\n'   +
          '  "distanceKm": "13.357",\n'   +
          '  "departureTime": "2022-10-14T19:55:00.000Z",\n'   +
          '  "arrivalTime": "2022-10-14T20:30:00.000Z",\n'   +
          '  "transport": "tram"\n'   +
        '  },\n'   +
        " {\n" +
          '  "origin": "",\n'   +
          '  "destination": "Edinburgh",\n'   +
          '  "distanceKm": "0.384",\n'   +
          '  "departureTime": "2022-10-14T20:30:00.000Z",\n'   +
          '  "arrivalTime": "2022-10-14T20:34:52.000Z",\n'   +
          '  "transport": "foot"\n'   +
        '  },\n'   +
        " {\n" +
          '  "origin": "London Bridge",\n'   +
          '  "destination": "",\n'   +
          '  "distanceKm": "0.389",\n'   +
          '  "departureTime": "2022-10-17T06:27:02.000Z",\n'   +
          '  "arrivalTime": "2022-10-17T06:32:27.000Z",\n'   +
          '  "transport": "foot"\n'   +
        '  },\n'   +
        " {\n" +
          '  "origin": "London Bridge",\n'   +
          '  "destination": "Green Park",\n'   +
          '  "distanceKm": "4.232",\n'   +
          '  "departureTime": "2022-10-17T06:32:27.000Z",\n'   +
          '  "arrivalTime": "2022-10-17T06:39:00.000Z",\n'   +
          '  "transport": "subway"\n'   +
        '  },\n'   +
        " {\n" +
          '  "origin": "",\n'   +
          '  "destination": "",\n'   +
          '  "distanceKm": "0.11",\n'   +
          '  "departureTime": "2022-10-17T06:39:00.000Z",\n'   +
          '  "arrivalTime": "2022-10-17T06:40:51.000Z",\n'   +
          '  "transport": "foot"\n'   +
        '  },\n'   +
        " {\n" +
          '  "origin": "Green Park",\n'   +
          '  "destination": "Heathrow Terminals 2 & 3",\n'   +
          '  "distanceKm": "24.989",\n'   +
          '  "departureTime": "2022-10-17T06:44:00.000Z",\n'   +
          '  "arrivalTime": "2022-10-17T07:33:00.000Z",\n'   +
          '  "transport": "subway"\n'   +
        '  },\n'   +
        " {\n" +
          '  "origin": "",\n'   +
          '  "destination": "London",\n'   +
          '  "distanceKm": "0.413",\n'   +
          '  "departureTime": "2022-10-17T07:33:00.000Z",\n'   +
          '  "arrivalTime": "2022-10-17T07:38:41.000Z",\n'   +
          '  "transport": "foot"\n'   +
        '  },\n'   +
        " {\n" +
          '  "origin": "Glasgow Airport (GLA)",\n'   +
          '  "destination": "Glasgow",\n'   +
          '  "distanceKm": "18.003",\n'   +
          '  "departureTime": "2022-10-17T11:30:00.000Z",\n'   +
          '  "arrivalTime": "2022-10-17T11:49:17.000Z",\n'   +
          '  "transport": "taxi"\n'   +
        '  },\n'   +
        " {\n" +
          '  "origin": "Bristol",\n'   +
          '  "destination": "Manchester",\n'   +
          '  "distanceKm": "269.853",\n'   +
          '  "departureTime": "2022-10-20T18:00:00.000Z",\n'   +
          '  "arrivalTime": "2022-10-20T21:05:15.000Z",\n'   +
          '  "transport": "dieselCar"\n'   +
        '  },\n'   +
        " {\n" +
          '  "origin": "Bristol Bond St",\n'   +
          '  "destination": "Bristol Airport",\n'   +
          '  "distanceKm": "15.15563166",\n'   +
          '  "departureTime": "2022-10-20T14:30:00.000Z",\n'   +
          '  "arrivalTime": "2022-10-20T15:05:00.000Z",\n'   +
          '  "transport": "bus"\n'   +
        '  },\n'   +
        " {\n" +
          '  "origin": "",\n'   +
          '  "destination": "Bristol Airport (BRS)",\n'   +
          '  "distanceKm": "0.53",\n'   +
          '  "departureTime": "2022-10-20T15:05:00.000Z",\n'   +
          '  "arrivalTime": "2022-10-20T15:12:10.000Z",\n'   +
          '  "transport": "foot"\n'   +
        '  },\n'   +
        " {\n" +
          '  "origin": "Adolfo Su√°rez Madrid‚ÄìBarajas Airport (MAD)",\n'   +
          '  "destination": "Madrid",\n'   +
          '  "distanceKm": "27.809",\n'   +
          '  "departureTime": "2022-10-20T20:59:00.000Z",\n'   +
          '  "arrivalTime": "2022-10-20T21:27:37.000Z",\n'   +
          '  "transport": "taxi"\n'   +
        '  },\n'   +
        " {\n" +
          '  "origin": "Victoria Coach",\n'   +
          '  "destination": "Cabot Circus (S4)",\n'   +
          '  "distanceKm": "195.6060707",\n'   +
          '  "departureTime": "2022-10-14T18:00:00.000Z",\n'   +
          '  "arrivalTime": "2022-10-14T20:55:00.000Z",\n'   +
          '  "transport": "coach"\n'   +
        '  },\n'   +
        " {\n" +
          '  "origin": "Bond Street",\n'   +
          '  "destination": "St Augustine'   +' s Parade",\n'   +
          '  "distanceKm": "0.99",\n'   +
          '  "departureTime": "2022-10-14T20:55:00.000Z",\n'   +
          '  "arrivalTime": "2022-10-14T20:58:03.000Z",\n'   +
          '  "transport": "electricScooter"\n'   +
        " {\n" +
      "]\n"]
    // file object
    const file = new Blob(texts,  {type: 'text/json'   });
    // anchor link
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = "example.json";
    // simulate link click
    document.body.appendChild(element);
    // Required for this to work in FireFox
    element.click();
    }

  return (
    <>
      <Button variant="primary" value="download" onClick= {downloadTxtFile}>Download</Button>  {''}
    </>
  )
}