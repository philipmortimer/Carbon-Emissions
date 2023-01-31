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
                System.err.println("An error occurred: " + error.getMessage());
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

            String headerRow = lines.get(0).toUpperCase();
            List<String> lineData;
            lineData = List.of(headerRow.split(","));
            if (lineData.size() == 0) {
                return new apiResponse("{\"error\": \"Empty input file\"}");
            }

            // CSV title row: (origin, destination, distanceKm, departureTime, arrivalTime, transport)
            // Indices are constant since csv schema is set
            int distanceIndex = 2;
            int transportIndex = 5;

            int travellersNo = 1;

            int lineNo = 2;
            for(String ln : lines.subList(1, lines.size())) {
                lineData = List.of(ln.split(","));

                float distanceKM;
                try{
                    distanceKM = Float.parseFloat(lineData.get(distanceIndex));
                } catch (NumberFormatException e) {
                    return new apiResponse("{\"error\": \"Invalid trip Distance on line " + lineNo + " of input\"}");
                } catch (Exception e) {
                    e.printStackTrace();
                    return new apiResponse("{\"error\": \"Error parsing trip Distance on line " + lineNo + " of input\"}");
                }

                String transportType = lineData.get(transportIndex);
                if (!validTravelType.contains(transportType)) {
                    return new apiResponse("{\"error\": \"Invalid transport type on line " + lineNo + " of input\"}");
                }

//                Uncomment later if number of travellers for trips is no longer standardised to 1
//                int travellers;
//                try{
//                    travellers = Integer.parseInt(lineData.get(travellersIndex));
//                } catch (NumberFormatException e) {
//                    return new apiResponse("{\"error\": \"Invalid no. of Travellers on line " + lineNo + " of input\"}");
//                } catch (Exception e) {
//                    e.printStackTrace();
//                    return new apiResponse("{\"error\": \"Error parsing no. of Travellers on line " + lineNo + " of input\"}");
//                }

                journeys = journeys.concat((journeys.isEmpty() ? "" : ",") + String.format(template, transportType, distanceKM, travellersNo));
                lineNo++;
            }

            String jsonString = "{\"apiKey\":\"" + Helper.getApiKey() + String.format("\",\"id\":\"id\",\"journeys\":[%s]}", journeys);
            responseString = Helper.postJsonAsString(props.getEmissionsEndpoint(), jsonString);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new apiResponse(responseString);
    }
}
