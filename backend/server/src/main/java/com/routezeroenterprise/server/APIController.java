package com.routezeroenterprise.server;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    private final static Helper.Properties props = Helper.loadProperties();
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
    public ResponseEntity<String> getPredictions(@RequestBody String csv){
        return ResponseEntity.ok()
                .body(fs.upload(csv, null).getResponse()); //will delegate call to required method
    }

    /**
     * Displays the API properties.
     * @return API properties (currently, the emissions endpoint and the frontend address).
     */
    @GetMapping("/properties")
    public Helper.Properties props(){
        return props;
    }
}