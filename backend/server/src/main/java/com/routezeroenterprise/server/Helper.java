package com.routezeroenterprise.server;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
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
     * A general error function to be used where possible.
     * Can be used for returning from string functions, as it always returns a string that starts with "Error".
     * @param e The exception
     * @param preface Error details
     * @return The error string
     */
    private static String gracefulError(Exception e, String... preface){
        String prefix;
        if(preface.length == 0) { prefix = e.toString(); }
        else if(preface.length == 1) { prefix = preface[0]; }
        else { prefix = Arrays.stream(preface).reduce("", (x, y) -> x + y).toString(); }
        System.err.println(prefix+e.getMessage());
        e.printStackTrace();
        return "Error" + prefix;
    }

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
     */
    public static String postJsonAsString(String endpoint, String j){
        URL url;
        try {
            url = new URL(endpoint);
        } catch(MalformedURLException e){
            return gracefulError(e);
        }

        HttpURLConnection connection;
        try {
            connection = (HttpURLConnection) url.openConnection();
        }catch(IOException e){
            return gracefulError(e);
        }

        try {
            connection.setRequestMethod("POST");
        } catch(ProtocolException e){
            return gracefulError(e);
        }
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestProperty("Accept", "application/json");
        connection.setDoOutput(true);

        try(OutputStream outStream = connection.getOutputStream()){
            byte[] payload = j.getBytes(StandardCharsets.UTF_8);
            outStream.write(payload, 0, payload.length);
        }catch(IOException e){
            return gracefulError(e);
        }

        StringBuilder response = new StringBuilder();
        try(BufferedReader br = new BufferedReader(
                new InputStreamReader(connection.getInputStream(), StandardCharsets.UTF_8))) {
            String responseLine = null;
            while ((responseLine = br.readLine()) != null) {
                response.append(responseLine.trim());
            }
            return response.toString();
        }catch (IOException e){
            return gracefulError(e);
        }
    }

    /**
     * Loads the API key.
     * @return The API key. If the API key file can't be found, an error message is displayed
     * and Optional.empty() is returned.
     */
    static Optional<String> getApiKey(){
        String apiKeyAsText = null;
        try {
            apiKeyAsText = loadFileAsText("src/main/resources/api_key.json");
        } catch (IOException e) {
            // TODO Implement a better solution (see comment below)
            /* Failure to load the API key is a non-recoverable error
            We should throw a runtime exception and stop the application.
            However, our GitHub automatically runs the Unit tests. As we don't
            upload our API key to GitHub and as we require the APIController to load the key
            as a static variable (at the time of writing), this leads all unit tests to automatically fail
            on GitHub. Hence, we print an error message instead.
            However, correct programming practice dictates that this catch block should read "
            throw new RuntimeException(e);". Instead it reads as follows below
            */
            gracefulError(e, "Error retrieving API key. You MUST stop the backend" +
                    " immediately and restart, ensuring that the API key file is accessible. A runtime exception" +
                    " should be thrown here. However, this would mess up GitHub automated tests" +
                    " which don't have access to the API key. So unless, this log is being displayed in a GitHub" +
                    " automated test, RESTART AND FIX THE ISSUE.");
            return Optional.empty();
        }
        JsonObject jsonObject = new Gson().fromJson(apiKeyAsText, JsonObject.class);
        return Optional.of(jsonObject.get("apiKey").toString());
    }

    /**
     * Loads the properties.jon file.
     * @return The properties.
     * @throws RuntimeException If the reading the contents of the properties.json file throws an error,
     * we throw a runtime exception.
     */
    static Properties loadProperties() throws RuntimeException{
        try {
            ObjectMapper mapper = new ObjectMapper();
            String propsAsText = loadFileAsText("src/main/resources/properties.json");
            return mapper.readValue(propsAsText, Properties.class);

        } catch (IOException e){
            // Failure to load the properties is a non-recoverable error
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
        private String emissionsEndpoint;
        /**
         * The frontend address from the file
         */
        private String frontendAddress;

        /**
         * Sets the emissions endpoint
         * @param endpoint The endpoint
         */
        void setEmissionsEndpoint(String endpoint){ emissionsEndpoint = endpoint; }
        /**
         * Sets the frontend address
         * @param address The frontend address
         */
        void setFrontendAddress(String address) { frontendAddress = address; }

        /**
         * Gets the emissions endpoint.
         * @return The emissions endpoint
         */
        String getEmissionsEndpoint(){
            return emissionsEndpoint;
        }

        /**
         * Gets the frontend address.
         * @return The frontend address.
         */
        String getFrontendAddress() { return frontendAddress; }
    }
}
