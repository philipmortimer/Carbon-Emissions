package com.routezeroenterprise.server;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class FileUploadService {
    private final static Helper.Properties props = Helper.loadProperties();

    public apiResponse uploadFile(MultipartFile file) {

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

                journeys = journeys.concat((journeys.isEmpty() ? "" : ",") + String.format(template, transportType, distanceKM, travellers));
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
