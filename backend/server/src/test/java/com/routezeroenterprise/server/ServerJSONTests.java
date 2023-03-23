package com.routezeroenterprise.server;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.multipart.MultipartFile;
import org.xmlunit.builder.Input;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Class tests the upload and handling of JSON files.
 */
@SpringBootTest
public class ServerJSONTests {

    /**
     * A FileUploadService instance used to test our API.
     */
    private final FileUploadService fs = new FileUploadService();

    /**
     * The contents of a valid json file ('VALID.json').
     */
    private static final String JSON_VALID = loadTextFileTest("src/main/resources/TestJSON/VALID_JSON.json");
    /**
     * The contents of a small valid json file ('VALID_SMALL.json').
     */
    private static final String JSON_VALID_SMALL = loadTextFileTest("src/main/resources/TestJSON/VALID_SMALL.json");
    /**
     * The contents of an empty json file ('INVALID_EMPTY.json').
     */
    private static final String JSON_EMPTY = loadTextFileTest("src/main/resources/TestJSON/INVALID_EMPTY.json");
    // /**
    //  * The contents of a json file with an invalid header ('INVALID_HEADER.json').
    //  */
    // private static final String JSON_INVALID_HEADER = loadTextFileTest("src/main/resources/TestJSON/INVALID_HEADER.json");
    // /**
    //  * The contents of a json file with invalid number of fields ('INVALID_FIELD_NO.json').
    //  */
    // private static final String JSON_INVALID_FIELD_NO = loadTextFileTest("src/main/resources/TestJSON/INVALID_FIELD_NO.json");
    // /**
    //  * The contents of a json file with an invalid transport type ('INVALID_TRANSPORT.json').
    //  */
    private static final String JSON_INVALID_TRANSPORT = loadTextFileTest("src/main/resources/TestJSON/INVALID_TRANSPORT.json");
    /**
     * The contents of a json file with an invalid distance value ('INVALID_DISTANCE_VALUE.json').
     */
    private static final String JSON_INVALID_DISTANCE_VALUE = loadTextFileTest("src/main/resources/TestJSON/INVALID_DISTANCE_VALUE.json");
    /**
     * The contents of a json file with an invalid distance type ('INVALID_DISTANCE_TYPE.json').
     */
    private static final String JSON_INVALID_DISTANCE_TYPE = loadTextFileTest("src/main/resources/TestJSON/INVALID_DISTANCE_TYPE.json");

    /**
     * The contents of a json file with an invalid key ('INVALID_KEYS.json').
     */
    private static final String JSON_INVALID_KEYS = loadTextFileTest("src/main/resources/TestJSON/INVALID_KEYS.json");

    /**
     * A test helper function that loads a file but handles any IO errors that may be thrown.
     * @param path The file path.
     * @return The file contents
     * @throws RuntimeException A runtime exception is thrown if the file can't be loaded
     */
    static String loadTextFileTest(String path) throws RuntimeException{
        try{
            String contents = Helper.loadFileAsText(path);
            return contents;
        } catch (IOException e) {
            // File has not been loaded due to IO issues. This is a non-recoverable error.
            throw new RuntimeException(e);
        }
    }

    /**
     * <b>VALID JSON TEST</b><br/>
     * Tests that no error is thrown if a valid JSON file is passed.
     */
    @Test
    void uploadValidJSONsShouldSucceed(){
        assertFalse(fs.upload(JSON_VALID).getResponse().contains("error"));
    }
    /**
     * <b>VALID SMALL JSON TEST</b><br/>
     * Tests that no error is thrown if a small valid JSON file is passed.
     */
    @Test
    void uploadSmallValidJSONsShouldSucceed(){
        assertFalse(fs.upload(JSON_VALID_SMALL).getResponse().contains("error"));
    }
    /**
     * <b>INVALID NULL INPUT TEST</b><br/>
     * Tests that an error is thrown if a null is passed as the JSON file contents.
     */
    @Test
    void uploadNoJSONShouldFail(){
        assertTrue(fs.upload(null).getResponse().contains("The File provided was null unexpectedly."));
    }
    /**
     * <b>INVALID EMPTY JSON TEST</b><br/>
     * Tests that an error is thrown if an empty JSON file is passed.
     */
    @Test
    void uploadEmptyJSONShouldFail() {
        assertTrue(fs.upload(JSON_EMPTY).getResponse().contains("Empty JSON File provided."));
    }
    // /**
    //  * <b>INVALID HEADER JSON TEST</b><br/>
    //  * Tests that an error is thrown if a JSON file with an invalid header is passed.
    //  */
    // @Test
    // void uploadInvalidHeaderCSVShouldFail() {
    //     assertTrue(fs.upload(CSV_INVALID_HEADER).getResponse().contains("First line of JSON file must be heading."));
    // }
    // /**
    //  * <b>INVALID FIELD NUMBER JSON TEST</b><br/>
    //  * Tests that an error is thrown if JSON file with a row with invalid number of fields is passed.
    //  */
    // @Test
    // void uploadInvalidFieldNOCSVShouldFail() {
    //     assertTrue((fs.upload(CSV_INVALID_FIELD_NO).getResponse().contains("Line 4 should have exactly 5 fields. I.E. it should have exactly 5 commas.Here is the content of the invalid line: Bristol Temple Meads,9.536,2022-10-14T19:16:00.000Z,train")));
    // }
    /**
     * <b>INVALID TRANSPORT TYPE JSON TEST</b><br/>
     * Tests that an error is thrown if a JSON file with an invalid transport type is passed.
     */
    @Test
    void uploadInvalidTransportTypeJSONShouldFail() {
        assertTrue(fs.upload(JSON_INVALID_TRANSPORT).getResponse().contains("[TRANSPORT] Object number 6 contains an invalid transport type. Transport type 'walking' is invalid."));
    }
    /**
     * <b>INVALID DISTANCE VALUE JSON TEST</b><br/>
     * Tests that an error is thrown if a JSON file with an invalid distance value is passed.
     */
    @Test
    void uploadInvalidDistanceValueJSONShouldFail() {
        assertTrue(fs.upload(JSON_INVALID_DISTANCE_VALUE).getResponse().contains("[DISTANCE] Object number 4 contains and invalid distance value. Distance must be positive (strictly greater than zero). Distance found: -15.155632"));
    }
    /**
     * <b>INVALID DISTANCE TYPE JSON TEST</b><br/>
     * Tests that an error is thrown if a JSON file with an invalid distance type is passed.
     */
    @Test
    void uploadInvalidDistanceTypeJSONShouldFail() {
        assertTrue(fs.upload(JSON_INVALID_DISTANCE_TYPE).getResponse().contains("[DISTANCE] Object number 1 of file. Distance must be a valid real number (e.g. 1.2)."));
    }


}