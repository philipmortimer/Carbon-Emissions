import React from 'react';
import Button from 'react-bootstrap/Button';
export const CSVDownloadButton = (props) => {
  
    const downloadTxtFile = () => {
    // text content
    const texts = ["origin,destination,distanceKm,departureTime,arrivalTime,transport\n" + 
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
    "Victoria Coach,Cabot Circus (S4),195.60607071977284,2022-10-14T18:00:00.000Z,2022-10-14T20:55:00.000Z,coach\n" +
    ",,0.527,2022-10-14T20:55:00.000Z,2022-10-14T21:01:30.000Z,foot\n" +
    "Union Street,The Centre (C7),0.774,2022-10-14T21:07:30.000Z,2022-10-14T21:11:00.000Z,bus"]
    // file object
    const file = new Blob(texts, {type: 'text/csv'});
    // anchor link
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = "example.csv";
    // simulate link click
    document.body.appendChild(element);
    // Required for this to work in FireFox
    element.click();
    }

  return (
    <>
      <Button id="CSVDownloadButton" value="download" onClick={downloadTxtFile}>Download</Button>{' '}
    </>
  )
}
