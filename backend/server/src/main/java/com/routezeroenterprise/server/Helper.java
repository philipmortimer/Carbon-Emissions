package com.routezeroenterprise.server;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Scanner;

public class Helper {

    private static final ObjectMapper mapper = new ObjectMapper();

    /* TODO
        -
        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        @@@@@@ DO NOT COMMIT OR PUSH A POPULATED api_key.json EVER @@@@@@
        @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

        if you have accidentally git add 'd the api key, simply remove it from the staging area with
        git reset -- src/main/resources/api_key.json

    */

    //java class to turn our properties json into
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
        public String emissionsEndpoint;

        public void setRouteZeroEndpoint(String endpoint){
            emissionsEndpoint = endpoint;
        }

        public String getEmissionsEndpoint(){
            return emissionsEndpoint;
        }
    }

    //general error function to be used where possible
    private static String gracefulError(Exception e, String... preface){
        String prefix;
        if(preface.length == 0) { prefix = e.toString(); }
        else if(preface.length == 1) { prefix = preface[0]; }
        else { prefix = Arrays.stream(preface).reduce("", (x, y) -> x + y).toString(); }
        System.out.println(prefix+e.getMessage());
        e.printStackTrace();
        return "MalformedURLException Error";
    }

    // general helper methods
    private static String loadFileAsText(String path){
        try {
            File f = new File(path);
            Scanner r = new Scanner(f);
            String text = "";
            while (r.hasNextLine()) {
                text += r.nextLine();
            }
            r.close();
            return text;

        } catch (FileNotFoundException e) {
            System.out.println("FileNotFoundException Error " + e.getMessage());
            e.printStackTrace();
            return "FileNotFoundException Error";
        }
    }

    //sends a RESTful request to 'endpoint' according to the json 'j' in string form
    public static String postJsonAsString(String endpoint, String j){
        URL url;
        try {
            url = new URL(endpoint);
        } catch(MalformedURLException e){
            System.out.println("MalformedURLException Error "+e.getMessage());
            e.printStackTrace();
            return "MalformedURLException Error";
        }
        try {
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        }catch(IOException e){

        }
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestProperty("Accept", "application/json");
        connection.setDoOutput(true);

        try(OutputStream outStream = connection.getOutputStream()){
            String jsonText = "{\"apiKey\":\""+Helper.getApiKey()+"\",\"id\":\"id\",\"journeys\":[{\"transport\":{\"type\":\"flight\"},\"distanceKm\":480,\"travellers\":2},{\"transport\":{\"type\":\"electricScooter\"},\"distanceKm\":2.1,\"travellers\":1}]}";
            System.out.println(jsonText);
            byte[] payload = jsonText.getBytes(StandardCharsets.UTF_8);
            outStream.write(payload, 0, payload.length);
        }

        StringBuilder response = new StringBuilder();
        try(BufferedReader br = new BufferedReader(
                new InputStreamReader(connection.getInputStream(), StandardCharsets.UTF_8))) {
            String responseLine = null;
            while ((responseLine = br.readLine()) != null) {
                response.append(responseLine.trim());
            }
            System.out.println(response.toString());
        }
    }

    // initialisation methods
    public static String getApiKey(){
        try {
            String apiKeyAsText = loadFileAsText("src/main/resources/api_key.json");
            ApiKey k = mapper.readValue(apiKeyAsText, ApiKey.class);
            return k.get();

        } catch (JsonMappingException e){
            System.out.println("JsonMappingException Error "+e.getMessage());
            e.printStackTrace();
        } catch (JsonProcessingException e){
            System.out.println("JsonProcessingException Error "+e.getMessage());
            e.printStackTrace();
        }
        return "Error reading API key";
    }

    public static Properties loadProperties(){
        try {
            String propsAsText = loadFileAsText("src/main/resources/properties.json");
            return mapper.readValue(propsAsText, Properties.class);

        } catch (JsonMappingException e){
            System.out.println("JsonMappingException Error "+e.getMessage());
            e.printStackTrace();
        } catch (JsonProcessingException e){
            System.out.println("JsonProcessingException Error "+e.getMessage());
            e.printStackTrace();
        }
        return new Properties();
    }
}
