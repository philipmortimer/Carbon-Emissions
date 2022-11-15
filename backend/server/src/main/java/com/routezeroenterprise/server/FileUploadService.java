package com.routezeroenterprise.server;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


// WALK = "foot"
// BIKE = "bike"
// ELECTRIC_SCOOTER = "electricScooter"
// PETROL_CAR = "petrolCar"
// DIESEL_CAR = "dieselCar"
// HYBRID_CAR = "hybridCar"
// ELECTRIC_CAR = "electricCar"
// TAXI = "taxi"
// BUS = "bus"
// COACH = "coach"
// TRAIN = "train"
// EUROSTAR = "eurostar"
// LIGHT_RAIL = "lightRail"
// TRAM = "tram"
// SUBWAY = "subway"
// DOMESTIC_FLIGHT = "flight"
// FERRY = "ferry"

@Service
public class FileUploadService {
    private final static Helper.Properties props = Helper.loadProperties();

    public apiResponse uploadFile(MultipartFile file) {
        List<String> validTravelType = Arrays.asList(
                "foot",
                "bike",
                "electricScooter",
                "petrolCar",
                "dieselCar",
                "hybridCar",
                "electricCar",
                "taxi",
                "bus",
                "coach",
                "train",
                "eurostar",
                "lightRail",
                "tram",
                "subway",
                "flight",
                "ferry"
        );

        String responseString = "";
        try {
            BufferedReader br;
            InputStream is = file.getInputStream();
            br = new BufferedReader(new InputStreamReader(is));

            String template = "{\"transport\":{\"type\":\"%s\"},\"distanceKm\":%f,\"travellers\":%d}";
            String journeys = "";
            String line;

            boolean firstRow = true;
            int distanceIndex = 0, transportIndex = 0, travellers = 0;

            int lineNo = 2;
            while ((line = br.readLine()) != null) {

                List<String> lineData = List.of(line.split(","));

                // Getting the index for the parameters required for the journeys' template
                // CSV title row: (origin, destination, distanceKm, departureTime, arrivalTime, transport)
                if (firstRow){
                    distanceIndex = lineData.indexOf("distanceKm");
                    transportIndex = lineData.indexOf("transport");
                    travellers = 1; // int travellersIndex = lineData.indexOf("travellers");
                    firstRow = false;
                    continue;
                }


                String transportType = lineData.get(transportIndex);
                float distanceKM = Float.parseFloat(lineData.get(distanceIndex));
                // int travellers = Integer.parseInt(lineData.get(travellersIndex));

                if (!validTravelType.contains(transportType)) {
                   return new apiResponse("Invalid transport type on line " + lineNo + " of " + file.getOriginalFilename());
                }

                journeys = journeys.concat((journeys.isEmpty() ? "" : ",") + String.format(template, transportType, distanceKM, travellers));
                lineNo++;
            }

            String jsonString = "{\"apiKey\":\"" + Helper.getApiKey() + String.format("\",\"id\":\"id\",\"journeys\":[%s]}", journeys);
            System.out.println(jsonString);

            responseString = Helper.postJsonAsString(props.getEmissionsEndpoint(), jsonString);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new apiResponse(responseString);
    }
}
