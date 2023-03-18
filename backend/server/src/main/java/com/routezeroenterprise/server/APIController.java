package com.routezeroenterprise.server;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 * Controller for the API. This class is the point of contact for the frontend end and is where requests are
 * made and corresponding results are returned.
 */
//@CrossOrigin(origins = {"localhost:3000", "https://rz-frontend.vzjfxzf7sdt.eu-gb.codeengine.appdomain.cloud/"})
//@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class APIController {
    /**
     * Stores the contents of the properties JSON. Currently, this contains the emissionsEndpoint
     * and frontend address.
     */
    final static Helper.Properties PROPS = Helper.loadProperties();
    /**
     * The API key.
     */
    final static String API_KEY = Helper.getApiKey();
    /**
     * Used to upload the CSV file to route zero API.
     */
    private final FileUploadService fs = new FileUploadService();

    /**
     * This method is used to query the Route Zero API for predictions of how
     * carbon emissions could be altered given the relevant travel data.
     * @param csv The CSV file containing the travel information.
     * @return The API response. This will either be
     * the predicted future emissions data or a suitable error message.
     */
    @CrossOrigin(origins = "*")
    @RequestMapping(method = RequestMethod.POST, path = "/get_predictions")
    public ResponseEntity<String> getPredictions(@RequestBody String inputFile){
        return ResponseEntity.ok()
                .body(fs.upload(inputFile).getResponse()); //will delegate call to required method
    }
}