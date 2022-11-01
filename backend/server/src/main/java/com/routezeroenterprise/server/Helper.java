package com.routezeroenterprise.server;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class Helper {

    private static final ObjectMapper mapper = new ObjectMapper();

    //java class to turn our apikey json into
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
        public String routeZeroEndpoint;

        public void setRouteZeroEndpoint(String endpoint){
            routeZeroEndpoint = endpoint;
        }

        public String getRouteZeroEndpoint(){
            return routeZeroEndpoint;
        }
    }

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
        return "Error 500";
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
