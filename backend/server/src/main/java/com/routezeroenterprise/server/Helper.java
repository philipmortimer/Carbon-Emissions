package com.routezeroenterprise.server;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Properties;
import java.util.Scanner;

public class Helper {

    private static final ObjectMapper mapper = new ObjectMapper();
    /**
     * Stores the contents of the properties JSON. Currently, this contains the emissionsEndpoint
     * and frontend address.
     */
    final static Helper.Properties props = Helper.loadProperties();

    /* TODO
        -
        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        @@@@@@ DO NOT COMMIT OR PUSH A POPULATED api_key.json EVER @@@@@@
        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

        if you have accidentally git add 'd the api key, simply remove it from the staging area with
        git reset -- src/main/resources/api_key.json

    */

    //java class to turn our api_key json into
    static public class ApiKey {
        public String apiKey;

        public void set(String k){
            apiKey = k;
        }

        public String get(){
            return apiKey;
        }
    }
    //java class to turn our properties json into
    static public class Properties {
        private String emissionsEndpoint;
        private String frontendAddress;

        public void setEmissionsEndpoint(String endpoint){ emissionsEndpoint = endpoint; }
        public void setFrontendAddress(String address) { frontendAddress = address; }

        public String getEmissionsEndpoint(){
            return emissionsEndpoint;
        }
        public String getFrontendAddress() { return frontendAddress; }
    }

    //general error function to be used where possible
    //pass it the exception, and whatever error detail you want before it as 'preface'
    //can be used for returning from string functions, as it always returns a string that starts with "Error"
    private static String gracefulError(Exception e, String... preface){
        String prefix;
        if(preface.length == 0) { prefix = e.toString(); }
        else if(preface.length == 1) { prefix = preface[0]; }
        else { prefix = Arrays.stream(preface).reduce("", (x, y) -> x + y).toString(); }
        System.out.println(prefix+e.getMessage());
        e.printStackTrace();
        return "Error" + prefix;
    }

    // general helper methods
    public static String loadFileAsText(String path){
        try {
            File f = new File(path);
            Scanner r = new Scanner(f);
            String text = "";
            while (r.hasNextLine()) {
                text += r.nextLine() + "\n";
            }
            r.close();
            return text;

        } catch (FileNotFoundException e) {
            return gracefulError(e);
        }
    }

    //sends a RESTful request to 'endpoint' according to the json 'j' in string form
    //on success it will return a json response as a string
    //on fail it will return the string "Error <error-detail>"
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

    // loads the api_key.json file into a java object
    public static String getApiKey(){
        try {
            String apiKeyAsText = loadFileAsText("src/main/resources/api_key.json");
            ApiKey k = mapper.readValue(apiKeyAsText, ApiKey.class);
            return k.get();

        } catch (JsonProcessingException e){
            return gracefulError(e);
        }
    }

    // loads the properties.json file into a java object
    public static Properties loadProperties(){
        try {
            String propsAsText = loadFileAsText("src/main/resources/properties.json");
            return mapper.readValue(propsAsText, Properties.class);

        } catch (JsonProcessingException e){
            gracefulError(e);
        }
        return new Properties();
    }
}
