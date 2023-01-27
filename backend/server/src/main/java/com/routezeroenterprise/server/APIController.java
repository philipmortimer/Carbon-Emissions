package com.routezeroenterprise.server;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.function.ServerResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

//@CrossOrigin(origins = {"localhost:3000", "https://rz-frontend.vzjfxzf7sdt.eu-gb.codeengine.appdomain.cloud/"})
//@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class APIController {

    private final static String template = "Hello, %s";
    //private final static String frontendAddress = "localhost:3000";  //since this value HAS to be constant, we will need to change it manually
    private final static Helper.Properties props = Helper.loadProperties();
    private final FileUploadService fs = new FileUploadService();

    @GetMapping("/")
    public apiResponse apiCall(@RequestParam(value = "name", defaultValue = "World") String name) {
        return new apiResponse(String.format(template, name));
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(method = RequestMethod.POST, path = "/get_predictions")
    //@GetMapping("/get_predictions") //this is where the frontend will contact the server, we should require the frontend provide an API key to access this API
    public ResponseEntity<String> getPredictions(@RequestBody String csv) throws IOException {
        System.out.println(csv);

        return ResponseEntity.ok()
                //.headers(responseHeaders)
                .body(fs.upload(csv, null).getResponse()); //will delegate call to required method
    }

    @GetMapping("/properties")
    public Helper.Properties props(){
        return props;
    }
}
