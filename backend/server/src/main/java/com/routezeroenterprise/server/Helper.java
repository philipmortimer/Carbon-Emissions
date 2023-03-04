package com.routezeroenterprise.server;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Optional;

/**
 * Helper class used for a small number of helper methods.
 * Primarily used for loading the API key and other properties from text files.
 */
public class Helper {

    /* TODO
        -
        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        @@@@@@ DO NOT COMMIT OR PUSH A POPULATED api_key.json EVER @@@@@@
        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

        if you have accidentally git add 'd the api key, simply remove it from the staging area with
        git reset -- src/main/resources/api_key.json

    */

    /**
     * Loads file into string.
     * @param path File path.
     * @return File as string.
     * @throws IOException IOException may occur when attempting to read from file.
     */
    public static String loadFileAsText(String path) throws IOException {
        return Files.readString(Paths.get(path));
    }

    /**
     * Sends a RESTful request to the endpoint according to the json request provided.
     * On success, it will return the json response as a string.
     * On failure, it will return the string "Error 'error-detail'".
     * @param endpoint The endpoint.
     * @param j The JSON request.
     * @return The API response or an error message.
     * @throws IOException When making the request an error may occur (e.g. due to connection or readers).
     */
    public static String postJsonAsString(String endpoint, String j) throws IOException {
        // Makes request
        URL url = new URL(endpoint);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestProperty("Accept", "application/json");
        connection.setDoOutput(true);
        connection.setConnectTimeout(15000); // 15 seconds to establish connection to RZ server
        connection.setReadTimeout(20000); // 20 seconds to recieve response from RZ Server
        OutputStream outStream = connection.getOutputStream();
        byte[] payload = j.getBytes(StandardCharsets.UTF_8);
        outStream.write(payload, 0, payload.length);

        //Gets response
        StringBuilder response = new StringBuilder();
        InputStream inputStream = connection.getInputStream();
        InputStreamReader inputStreamReader = new InputStreamReader(inputStream, StandardCharsets.UTF_8);
        BufferedReader br = new BufferedReader(inputStreamReader);
        String responseLine = null;
        while ((responseLine = br.readLine()) != null) {
            response.append(responseLine.trim());
        }

        // Closes resources
        connection.disconnect();
        outStream.flush();
        outStream.close();
        inputStream.close();
        inputStreamReader.close();
        br.close();

        return response.toString();
    }

    /**
     * Loads the API key.
     * @return The API key.
     * @throws RuntimeException If reading the api_key.json file fails, a runtime exception is thrown.
     */
    static String getApiKey() throws RuntimeException{
        String apiKeyAsText = null;
        try {
            apiKeyAsText = loadFileAsText("src/main/resources/api_key.json");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        JsonObject jsonObject = new Gson().fromJson(apiKeyAsText, JsonObject.class);
        return jsonObject.get("apiKey").toString();
    }

    /**
     * Loads the properties.jon file.
     * @return The properties.
     * @throws RuntimeException If the reading the contents of the properties.json file throws an error,
     * we throw a runtime exception.
     */
    static Properties loadProperties() throws RuntimeException{
        try {
            String propsAsText = loadFileAsText("src/main/resources/properties.json");
            JsonObject jsonObject = new Gson().fromJson(propsAsText, JsonObject.class);
            String emissionsEndpoint = jsonObject.getAsJsonPrimitive("emissionsEndpoint").getAsString();
            String frontendAddress = jsonObject.getAsJsonPrimitive("frontendAddress").getAsString();
            return new Properties(emissionsEndpoint, frontendAddress);

        } catch (IOException e){
            // Failure to load the properties is a non-recoverable error.
            throw new RuntimeException(e);
        }
    }

    /**
     * Class used that stores the values of the properties file.
     */
    static class Properties {
        /**
         * The emissions endpoint from the file
         */
        private final String EMISSIONS_ENDPOINT;
        /**
         * The frontend address from the file
         */
        private final String FRONTEND_ADDRESS;

        /**
         * Gets the emissions endpoint.
         * @return The emissions endpoint
         */
        String getEmissionsEndpoint(){
            return EMISSIONS_ENDPOINT;
        }

        /**
         * Gets the frontend address.
         * @return The frontend address.
         */
        String getFrontendAddress() { return FRONTEND_ADDRESS; }

        /**
         * Creates new properties object that stores emissions endpoint and the frontend address.
         * @param emissionsEndpoint The emissions endpoint.
         * @param frontendAddress The frontend address.
         */
        private Properties(String emissionsEndpoint, String frontendAddress) {
            this.FRONTEND_ADDRESS = frontendAddress;
            this.EMISSIONS_ENDPOINT = emissionsEndpoint;
        }
    }
}
