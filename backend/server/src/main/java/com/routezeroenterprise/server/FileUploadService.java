package com.routezeroenterprise.server;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FileUploadService {
    private final static Helper.Properties props = Helper.loadProperties();

    //takes a file OR a string
    public apiResponse upload(String csvString, MultipartFile csvFile){
        if (csvString == null && csvFile == null) {
            return new apiResponse("{\"error\": \"upload requires one input, got none\"}");
        }
        if (csvString != null && csvFile != null) {
            return new apiResponse("{\"error\": \"upload requires one input, got two\"}");
        }
        List<String> requestStringLines;
        if (csvString != null) { //split into lines and send to internal parsing method
            requestStringLines = csvString.lines().toList();
        }else{
            requestStringLines = new ArrayList<String>();
            BufferedReader br;
            try {
                InputStream is = csvFile.getInputStream();
                br = new BufferedReader(new InputStreamReader(is));
                String ln;
                while ((ln = br.readLine()) != null) {
                    requestStringLines.add(ln);
                }
            }catch(IOException error){
                System.err.println("An error occured: "+ error.getMessage());
            }
        }
        return process(requestStringLines);
    }

    private apiResponse process(List<String> lines) {
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
            String template = "{\"transport\":{\"type\":\"%s\"},\"distanceKm\":%f,\"travellers\":%d}";
            String journeys = "";

            // Getting the index for the parameters required for the journeys' template
            // CSV title row: (origin, destination, distanceKm, departureTime, arrivalTime, transport)
            String firstRow = lines.get(0);
            List<String> lineData;
            lineData = List.of(firstRow.split(","));
            int distanceIndex = lineData.indexOf("distanceKm");
            int transportIndex = lineData.indexOf("transport");
            int travellers = 1; // int travellersIndex = lineData.indexOf("travellers");

            int lineNo = 2;
            for(String ln : lines.subList(1, lines.size())) {
                lineData = List.of(ln.split(","));

                float distanceKM = Float.parseFloat(lineData.get(distanceIndex));
                // int travellers = Integer.parseInt(lineData.get(travellersIndex));
                String transportType = lineData.get(transportIndex);
                if (!validTravelType.contains(transportType)) {
                    return new apiResponse("{\"error\": \"Invalid transport type on line " + lineNo + " of input\"}");
                }

                journeys = journeys.concat((journeys.isEmpty() ? "" : ",") + String.format(template, transportType, distanceKM, travellers));
                lineNo++;
            }

            String jsonString = "{\"apiKey\":\"" + Helper.getApiKey() + String.format("\",\"id\":\"id\",\"journeys\":[%s]}", journeys);
            //System.out.println(jsonString);

            responseString = Helper.postJsonAsString(props.getEmissionsEndpoint(), jsonString);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new apiResponse(responseString);
    }

}
