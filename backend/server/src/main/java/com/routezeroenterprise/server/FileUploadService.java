package com.routezeroenterprise.server;

import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

/**
 * This class parses CSV file, performing validation on the file.
 * The class then returns the Route Zero API response.
 */
@Service
public class FileUploadService {
    /**
     * Uploads the CSV string and sends it to the route zero backend for processing.
     * Returns the API response. If the CSV file is invalid, an error message is returned.
     * @param csvString The string containing the CSV file.
     * @return The API response (or an error message if the string is determined to be invalid).
     */
    public APIResponse upload(String csvString){
        /* Converts csv file to line of Strings, where each line is a row in the file.
        Sends the data to the process method which handles validation and API response. */
        return process(csvString.lines().toList());
    }

    /**
     * Checks the CSV String for any critical errors.
     * A critical error is either:
     * 1) An incorrectly formatted CSV file. Each line of the file must be of the form:
     * origin, destination, distanceKm, departureTime, arrivalTime, transport
     * The exception to this is the very first line which must be exactly
     * "origin,destination,distanceKm,departureTime,arrivalTime,transport".
     * For a file to be validly formatted, every other line must have exactly 5 commas.
     * 2) Invalid data in mandatory fields. Only "distanceKm" and "transport" are required fields.
     * "transport" must be one of the predefined valid transport types. "distanceKm" must be a positive
     * real number to be a valid journey.
     * @param lines The CSV file.
     * @return Optional.empty() is returned if there are no critical errors.
     * Otherwise, a String error message will be returned
     * (e.g. Optional.of("Line 2 of CSV file has invalid transport type 'ferry'")).
     */
    private Optional<String> checkForErrors(List<String> lines) {

    }


    /**
     * Processes the CSV file and returns the Route Zero API predictions.
     * The CSV file is first validated by this method to ensure that it is potentially valid.
     * Once validated, it is sent to the Route Zero API. The result of this API query is then returned.
     * If the file is invalid, an error JSON is returned instead.
     * @param lines
     * @return
     */
    private APIResponse process(List<String> lines) {
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
                return new APIResponse("{\"error\": \"Empty input file\"}");
            }

            // CSV title row: (origin, destination, distanceKm, departureTime, arrivalTime, transport)
            // Indices are constant since csv schema is set
            int originIndex = 0;
            int destinationIndex = 1;
            int distanceIndex = 2;
            int transportIndex = 5;

            int travellersNo = 1;

            int lineNo = 2;
            for(String ln : lines.subList(1, lines.size())) {
                lineData = List.of(ln.split(","));

                String originLower = lineData.get(originIndex).toLowerCase();
                String destinationLower = lineData.get(destinationIndex).toLowerCase();
                // Throw error if origin == destinations [allows for empty origin/destination fields to pass]
                if (originLower.compareTo(destinationLower) == 0 && !(originLower.equals("") || destinationLower.equals(""))) {
                    return new APIResponse("{\"error\": \"Origin and destination cannot be the same. Error in line " + lineNo + " of input.\"}");
                }

                float distanceKM;
                try{
                    distanceKM = Float.parseFloat(lineData.get(distanceIndex));
                    if (distanceKM <= 0) {
                        return new APIResponse("{\"error\": \"Trip distance cannot be less than or equal to 0. Error in line " + lineNo + " of input.\"}");
                    }
                } catch (NumberFormatException e) {
                    return new APIResponse("{\"error\": \"Invalid trip Distance in line " + lineNo + " of input.\"}");
                } catch (Exception e) {
                    e.printStackTrace();
                    return new APIResponse("{\"error\": \"Error parsing trip Distance in line " + lineNo + " of input.\"}");
                }

                String transportType = lineData.get(transportIndex);
                if (!validTravelType.contains(transportType)) {
                    return new APIResponse("{\"error\": \"Invalid transport type in line " + lineNo + " of input.\"}");
                }

//                Uncomment later if number of travellers for trips is no longer standardised to 1
//                int travellers;
//                try{
//                    travellers = Integer.parseInt(lineData.get(travellersIndex));
//                } catch (NumberFormatException e) {
//                    return new apiResponse("{\"error\": \"Invalid no. of Travellers in line " + lineNo + " of input.\"}");
//                } catch (Exception e) {
//                    e.printStackTrace();
//                    return new apiResponse("{\"error\": \"Error parsing no. of Travellers in line " + lineNo + " of input.\"}");
//                }

                journeys = journeys.concat((journeys.isEmpty() ? "" : ",") + String.format(template, transportType, distanceKM, travellersNo));
                lineNo++;
            }

            String jsonString = "{\"apiKey\":\"" + Helper.getApiKey() + String.format("\",\"id\":\"id\",\"journeys\":[%s]}", journeys);
            System.out.println(jsonString);
            responseString = Helper.postJsonAsString(Helper.props.getEmissionsEndpoint(), jsonString);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new APIResponse(responseString);
    }


}
