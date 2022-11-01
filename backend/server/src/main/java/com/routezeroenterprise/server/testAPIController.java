package com.routezeroenterprise.server;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;

@RestController
public class testAPIController {

    private final static String template = "Hello, %s";
    private final static Helper.Properties props = Helper.loadProperties();

    @GetMapping("/")
    public testAPI apiCall(@RequestParam(value = "name", defaultValue = "World") String name) {
        return new testAPI(String.format(template, name));
    }

    @GetMapping("/rz_call")
    public testAPI rzCall() throws IOException {
        //prediction api takes POST requests
        //testing calling the routezero api from our api

        //idiomatic code produced from following https://www.baeldung.com/httpurlconnection-post
        URL url = new URL(props.getRouteZeroEndpoint());
        HttpURLConnection connection = (HttpURLConnection)url.openConnection();
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestProperty("Accept", "application/json");
        connection.setDoOutput(true);

        byte[] payload = "{\"apiKey\":api_key(),\"id\":\"id\",\"journeys\":[{\"transport\":{\"type\":DOMESTIC_FLIGHT},\"distanceKm\":480,\"travellers\":2},{\"transport\":{\"type\":ELECTRIC_SCOOTER},\"distanceKm\":2.1,\"travellers\":1}]}".getBytes(StandardCharsets.UTF_8);
        int length = payload.length;

        return new testAPI(Helper.getApiKey());
    }

    @GetMapping("/properties")
    public Helper.Properties props(){
        return props;
    }
}
