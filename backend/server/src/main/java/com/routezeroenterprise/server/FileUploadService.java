package com.routezeroenterprise.server;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.*;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.util.*;

/**
 * This class parses CSV file, performing validation on the file.
 * The class then returns the Route Zero API response.
 */
@Service
public class FileUploadService {
    /**
     * The template used to make requests to Route Zero's backend.
     */
    private static final String API_REQUEST_TEMPLATE = "{\"transport\":{\"type\":\"%s\"},\"distanceKm\":%f,\"travellers\":%d}";
    /**
     * The number of travellers per journey. This is needed for the API request but is not provided in the CSV schema.
     * It is set to 1.
     */
    private static final int TRAVELLERS_PER_JOURNEY = 1;
    /**
     * Uploads the CSV string and sends it to the route zero backend for processing.
     * Returns the API response. If the CSV file is invalid, an error message is returned.
     * @param inputString The string containing the CSV/JSON file.
     * @return The API response (or an error message if the string is determined to be invalid).
     */
    public APIResponse upload(String inputString){
        /* Converts csv file to line of Strings, where each line is a row in the file.
        Sends the data to the process method which handles validation and API response. */
        return process(inputString);
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
     * (e.g. Optional.of("Line 2 of CSV file has invalid transport type 'submarine'")).
     */
    private static Optional<String> checkForCSVErrors(List<String> lines) {
        // Performs null checks. This probably isn't necessary but is safe.
        if (lines == null || lines.stream().anyMatch(x -> x == null)) {
            return Optional.of("Unexpected null error. This is likely because the file provided is empty.");
        }
        // Checks that file is not empty.
        if (lines.isEmpty()) {
            return Optional.of("Empty CSV File provided.");
        }
        // Checks that first line is header providing titles for each column.
        if (!lines.get(0).equals("origin,destination,distanceKm,departureTime,arrivalTime,transport")) {
            return Optional.of("First line of CSV file must be heading. The first line of the CSV" +
                    "file should say: 'origin,destination,distanceKm,departureTime,arrivalTime,transport'");
        }
        // Checks that every line in file has exactly the number of columns required by format
        for (int i = 0; i < lines.size(); i++) {
            if (StringUtils.countOccurrencesOf(lines.get(i), ",") != FileFormat.NO_FIELDS_IN_FILE) {
                return Optional.of("Line " + (i + 1) + " should have exactly " + FileFormat.NO_FIELDS_IN_FILE +
                        " fields. I.E. it should have exactly " + FileFormat.NO_FIELDS_IN_FILE +
                        " commas.Here is the content of the invalid line: " + lines.get(i));
            }
        }
        // Checks that every "distanceKm" and "transport" field is valid.
        // First line is ignored as it is a header line.
        for (int i = 1; i < lines.size(); i++) {
            String[] line =  lines.get(i).split(",", -1);
            // Checks that transport is one of the predefined valid types.
            if (!FileFormat.VALID_TRAVEL_TYPES.contains(line[FileFormat.TRANSPORT_INDEX])){
                return Optional.of("Line " + (i + 1) + " contains an invalid transport type. " +
                        " Transport type '" + line[FileFormat.TRANSPORT_INDEX] + "' is invalid.");
            }
            // Checks that distanceKm is a real number greater than 0
            try {
                float dist = Float.parseFloat(line[FileFormat.DISTANCE_INDEX]);
                if (dist <= 0) {
                    return Optional.of("Error on line " + (i + 1) +" of file. Distance must be positive " +
                            "(strictly greater than zero). Distance found: " + dist);
                }
            } catch (NumberFormatException e) {
                return Optional.of("Error on line " + (i + 1) +" of file. Distance must be a valid real number" +
                        " (e.g. 1.2).");
            }
        }
        return Optional.empty(); // No critical errors
    }

    private static Optional<String> checkForJSONErrors(List<Map<String,Object>> jsonFile) {
        // Checks that file is not empty.
        if (jsonFile.isEmpty()) {
            return Optional.of("Empty JSON File provided.");
        }
        // Checks that each object is include all required keys and validates distanceKm and transport values
        List<Integer> errorObjNo = new ArrayList<>();
        List<String> invalidValues = new ArrayList<>();
        for (int i = 0; i < jsonFile.size(); i++) {
            var registeredError = false;
            var jsonObject = jsonFile.get(i);
            // Validates object key set
            if (!jsonObject.keySet().equals(Set.of("origin","destination","distanceKm","departureTime","arrivalTime","transport"))) {
                errorObjNo.add(i+1);
                registeredError = true;
                invalidValues.add("[KEYS] Object number " + (i + 1) + " contains the wrong number of keys.");
            }
            // Checks that transport is one of the predefined valid types.
            if (jsonObject.containsKey("transport")) {
                String transportType = (String) jsonObject.get("transport");
                if (!FileFormat.VALID_TRAVEL_TYPES.contains(transportType)) {
                    if (!registeredError) {
                        errorObjNo.add(i+1);
                        registeredError = true;
                    }
                    System.out.println("ERROR DISTANCE");
                    invalidValues.add("[TRANSPORT] Object number " + (i + 1) + " contains an invalid transport type. " +
                            "Transport type '" + transportType + "' is invalid.");
                }
            }
            // Checks that distanceKm is a real number greater than 0
            if (jsonObject.containsKey("distanceKm")) {
                try {
                    float dist = Float.parseFloat((String) jsonObject.get("distanceKm"));
                    if (dist <= 0) {
                        if (!registeredError) {
                            errorObjNo.add(i+1);
                            registeredError = true;
                        }
                        invalidValues.add("[DISTANCE] Object number " + (i + 1) + " contains and invalid distance value. " +
                                "Distance must be positive (strictly greater than zero). Distance found: " + dist);
                    }
                } catch (NumberFormatException e) {
                    if (!registeredError) {
                        errorObjNo.add(i+1);
                        registeredError = true;
                    }
                    System.out.println("ERROR DISTANCE");
                    invalidValues.add("[DISTANCE] Object number " + (i + 1) + " of file. Distance must be a valid real number (e.g. 1.2).");
                }
            }
        }
        if (!errorObjNo.isEmpty()) {
            return Optional.of("Please make sure the JSON file you submitted is formatted properly. Errors found in objects number "
                    + errorObjNo + " " + (invalidValues.isEmpty() ? "" : invalidValues));
        }
        System.out.println(errorObjNo);
        return Optional.empty(); // No critical errors
    }

    /**
     * This method parses the CSV file for things that the user should be warned about but do not make a file
     * invalid. For example, it may be that the departure time is after the arrival time. As these
     * variables are not used by the Route Zero API, it is not a fatal error. However, it is something that the
     * user probably should be warned about. This method must only be called for files with no critical errors.
     * Note that no warning logic has been implemented yet as we have decided that most warnings hurt the user
     * experience.
     * @param lines The CSV file.
     * @return All the warnings. Each list element is a warning message.
     */
    private static List<String> getWarnings(List<String> lines) {
        List<String> warnings =  new ArrayList<>();
        /*
        At the moment, this code generates no warnings as we have decided that most warnings are likely
        to detract from the user experience. However, the skeleton code has been left as we may wish
        to add warnings in the future. To add warnings simply do warnings.add("Warning message here").
         */
        return warnings;
    }

    /**
     * Adds string array containing warnings to JSON response.
     * @param jo The JSON.
     * @param warnings The list of warnings to add.
     */
    private static void addWarningsToJson(JsonObject jo, List<String> warnings) {
        JsonArray array = new JsonArray();
        for (String warning : warnings) {
            array.add(new JsonPrimitive(warning));
        }
        jo.add("warnings", array);
    }

    // Processing file starts here
    private APIResponse process(String inputFile) {
        // Null check
        if (inputFile == null || inputFile.isEmpty()) {
            return new APIResponse("{\"error\": \"The file provided was null/empty unexpectedly.\"}");
        }

        // Builds the data of all the journeys using each travel record.
        StringBuilder journeys = new StringBuilder("");
        List<String> warnings = new ArrayList<>();

        try{
            // JSON File: Attempt to parse the file as JSON
            ObjectMapper objectMapper = new ObjectMapper();
            List<Map<String, Object>> jsonFile = objectMapper.readValue(inputFile, new TypeReference<List<Map<String, Object>>>(){});

            // Checks for critical errors in JSON file
            Optional<String> errors = checkForJSONErrors(jsonFile);
            if (errors.isPresent()) {
                return new APIResponse("{\"error\": \"" + errors.get() + "\"}");
            }

            journeys = processJSON(jsonFile, journeys);
        } catch (JsonProcessingException e) {
            // CSV File
            List<String> lines = inputFile.lines().toList();
            warnings = getWarnings(lines);

            // Checks for critical errors in CSV file
            Optional<String> errors = checkForCSVErrors(lines);
            if (errors.isPresent()) {
                return new APIResponse("{\"error\": \"" + errors.get() + "\"}");
            }

            journeys = processCSV(lines, journeys);
        }

        // Sends request to API and returns response
        String jsonString = "{\"apiKey\":" + APIController.API_KEY +
                String.format(",\"id\":\"id\",\"journeys\":[%s]}", journeys);

        String responseString = null;
        try {
            responseString = Helper.postJsonAsString(APIController.PROPS.getEmissionsEndpoint(), jsonString);
        } catch (IOException e) {
            System.err.println("Error making POST request " + e);
            e.printStackTrace();
            return new APIResponse("{\"errorCommunication\": \"" +
                    "Error when communicating with backend. Details: " + e.getMessage() + "\"}");
        }

        // Adds warnings to JSON string
        JsonObject jsonObject = new Gson().fromJson(responseString, JsonObject.class);
        addWarningsToJson(jsonObject, warnings);
        responseString = jsonObject.toString();

        return new APIResponse(responseString);
    }

    // Processes the JSON file and returns the journeys submitted
    private StringBuilder processJSON(List<Map<String, Object>> jsonFile, StringBuilder journeys) {
        // Gets the transport types and distance travelled
        for (Map<String, Object> map : jsonFile) {
            String transportType = (String) map.get("transport");
            Float distanceKm = Float.parseFloat((String) map.get("distanceKm"));

            journeys = journeys.append((journeys.isEmpty() ? "" : ",") +
                    String.format(API_REQUEST_TEMPLATE, transportType, distanceKm, TRAVELLERS_PER_JOURNEY));

        }
        return journeys;
    }

    /**
     * Processes the CSV file and returns the Route Zero API predictions.
     * The CSV file is first validated by this method to ensure that it is potentially valid.
     * Once validated, it is sent to the Route Zero API. The result of this API query is then returned.
     * If the file is invalid, an error JSON is returned instead. Additionally, warnings may be returned
     * about the CSV file alongside the API result.
     * @param csvLines Lines in the CSV file
     * @return The API response
     */
    private StringBuilder processCSV(List<String> csvLines, StringBuilder journeys) {
        for (int i = 1; i < csvLines.size(); i++) {
            String[] line = csvLines.get(i).split(",", -1);
            String transportType = line[FileFormat.TRANSPORT_INDEX];
            float distanceKm = Float.parseFloat(line[FileFormat.DISTANCE_INDEX]);
            journeys = journeys.append((journeys.isEmpty() ? "" : ",") +
                    String.format(API_REQUEST_TEMPLATE, transportType, distanceKm, TRAVELLERS_PER_JOURNEY));
        }
        return journeys;
    }

    /**
     * This class contains a few constants used to help access to CSV files uploaded.
     */
    private static class FileFormat {
        /**
         * The number of fields in the CSV file. A file is of the format:
         * origin,destination,distanceKm,departureTime,arrivalTime,transport.
         * Hence, it has 5 valid fields.
         */
        private static final int NO_FIELDS_IN_FILE = 5;
        /**
         * The index of each line at which the origin field is.
         */
        private static final int ORIGIN_INDEX = 0;
        /**
         * The index of each line at which the destination field is.
         */
        private static final int DESTINATION_INDEX = 1;
        /**
         * The index of each line at which the distanceKm field is.
         */
        private static final int DISTANCE_INDEX = 2;
        /**
         * The index of each line at which the departureTime field is.
         */
        private static final int DEP_TIME_INDEX = 3;
        /**
         * The index of each line at which the arrivalTime field is.
         */
        private static final int ARR_TIME_INDEX = 4;
        /**
         * The index of each line at which the transport field is.
         */
        private static final int TRANSPORT_INDEX = 5;
        /**
         * Stores all the valid transport types that the Route Zero API recognises.
         */
        private static final List<String> VALID_TRAVEL_TYPES = Arrays.asList(
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
    }
}
