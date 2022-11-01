package com.routezeroenterprise.server;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;

@RestController
public class testAPIController {

    private final static String template = "Hello, %s";
    private final static Helper.Properties props = Helper.loadProperties();
    private final static String apiKey = Helper.getApiKey();

    @GetMapping("/")
    public testAPI apiCall(@RequestParam(value = "name", defaultValue = "World") String name) {
        return new testAPI(String.format(template, name));
    }

    @GetMapping("/rz_call")
    public testAPI rzCall() throws IOException {
        //prediction api takes POST requests
        //testing calling the routezero api from our api
        if(apiKey.equals("Error reading API key")){
            return new testAPI(apiKey);
        }

        //idiomatic code produced from following https://www.baeldung.com/httpurlconnection-post
        URL url = new URL(props.getEmissionsEndpoint());
        HttpURLConnection connection = (HttpURLConnection)url.openConnection();
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

        return new testAPI(response.toString());
    }

    @GetMapping("/properties")
    public Helper.Properties props(){
        return props;
    }
}
