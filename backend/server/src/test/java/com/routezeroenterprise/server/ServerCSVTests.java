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
 * Class tests the upload and handling of CSV files.
 */
@SpringBootTest
public class ServerCSVTests {

    /**
     * A FileUploadService instance used to test our API.
     */
    private final FileUploadService fs = new FileUploadService();

    /**
     * The contents of a valid csv file ('VALID.csv').
     */
    private static final String CSV_VALID = loadTextFileTest("src/main/resources/TestCSV/VALID.csv");
    /**
     * The contents of a small valid csv file ('VALID_SMALL.csv').
     */
    private static final String CSV_VALID_SMALL = loadTextFileTest("src/main/resources/TestCSV/VALID_SMALL.csv");
    /**
     * The contents of an empty csv file ('INVALID_EMPTY.csv').
     */
    private static final String CSV_EMPTY = loadTextFileTest("src/main/resources/TestCSV/INVALID_EMPTY.csv");
    /**
     * The contents of a csv file with an invalid header ('INVALID_HEADER.csv').
     */
    private static final String CSV_INVALID_HEADER = loadTextFileTest("src/main/resources/TestCSV/INVALID_HEADER.csv");
    /**
     * The contents of a csv file with invalid number of fields ('INVALID_FIELD_NO.csv').
     */
    private static final String CSV_INVALID_FIELD_NO = loadTextFileTest("src/main/resources/TestCSV/INVALID_FIELD_NO.csv");
    /**
     * The contents of a csv file with an invalid transport type ('INVALID_TRANSPORT.csv').
     */
    private static final String CSV_INVALID_TRANSPORT = loadTextFileTest("src/main/resources/TestCSV/INVALID_TRANSPORT.csv");
    /**
     * The contents of a csv file with an invalid distance value ('INVALID_DISTANCE_VALUE.csv').
     */
    private static final String CSV_INVALID_DISTANCE_VALUE = loadTextFileTest("src/main/resources/TestCSV/INVALID_DISTANCE_VALUE.csv");
    /**
     * The contents of a csv file with an invalid distance type ('INVALID_DISTANCE_TYPE.csv').
     */
    private static final String CSV_INVALID_DISTANCE_TYPE = loadTextFileTest("src/main/resources/TestCSV/INVALID_DISTANCE_TYPE.csv");

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
     * <b>VALID CSV TEST</b><br/>
     * Tests that no error is thrown if a valid CSV file is passed.
     */
    @Test
    void uploadValidCSVsShouldSucceed(){
        assertFalse(fs.upload(CSV_VALID).getResponse().contains("error"));
    }
    /**
     * <b>VALID SMALL CSV TEST</b><br/>
     * Tests that no error is thrown if a small valid CSV file is passed.
     */
    @Test
    void uploadSmallValidCSVsShouldSucceed(){
        assertFalse(fs.upload(CSV_VALID_SMALL).getResponse().contains("error"));
    }
    /**
     * <b>INVALID NULL INPUT TEST</b><br/>
     * Tests that an error is thrown if a null is passed as the CSV file contents.
     */
    @Test
    void uploadNoCSVShouldFail(){
        assertTrue(fs.upload(null).getResponse().contains("The file provided was null/empty unexpectedly."));
    }
    /**
     * <b>INVALID EMPTY CSV TEST</b><br/>
     * Tests that an error is thrown if an empty CSV file is passed.
     */
    @Test
    void uploadEmptyCSVShouldFail() {
        assertTrue(fs.upload(CSV_EMPTY).getResponse().contains("The file provided was null/empty unexpectedly."));
    }
    /**
     * <b>INVALID HEADER CSV TEST</b><br/>
     * Tests that an error is thrown if a CSV file with an invalid header is passed.
     */
    @Test
    void uploadInvalidHeaderCSVShouldFail() {
        assertTrue(fs.upload(CSV_INVALID_HEADER).getResponse().contains("First line of CSV file must be heading."));
    }
    /**
     * <b>INVALID FIELD NUMBER CSV TEST</b><br/>
     * Tests that an error is thrown if CSV file with a row with invalid number of fields is passed.
     */
    @Test
    void uploadInvalidFieldNOCSVShouldFail() {
        assertTrue((fs.upload(CSV_INVALID_FIELD_NO).getResponse().contains("Line 4 should have exactly 5 fields. I.E. it should have exactly 5 commas.Here is the content of the invalid line: Bristol Temple Meads,9.536,2022-10-14T19:16:00.000Z,train")));
    }
    /**
     * <b>INVALID TRANSPORT TYPE CSV TEST</b><br/>
     * Tests that an error is thrown if a CSV file with an invalid transport type is passed.
     */
    @Test
    void uploadInvalidTransportTypeCSVShouldFail() {
        assertTrue(fs.upload(CSV_INVALID_TRANSPORT).getResponse().contains("Line 8 contains an invalid transport type.  Transport type 'airplane' is invalid."));
    }
    /**
     * <b>INVALID DISTANCE VALUE CSV TEST</b><br/>
     * Tests that an error is thrown if a CSV file with an invalid distance value is passed.
     */
    @Test
    void uploadInvalidDistanceValueCSVShouldFail() {
        assertTrue(fs.upload(CSV_INVALID_DISTANCE_VALUE).getResponse().contains("Error on line 15 of file. Distance must be positive (strictly greater than zero). Distance found: -533.4157"));
    }
    /**
     * <b>INVALID DISTANCE TYPE CSV TEST</b><br/>
     * Tests that an error is thrown if a CSV file with an invalid distance type is passed.
     */
    @Test
    void uploadInvalidDistanceTypeCSVShouldFail() {
        assertTrue(fs.upload(CSV_INVALID_DISTANCE_TYPE).getResponse().contains("Error on line 10 of file. Distance must be a valid real number (e.g. 1.2)"));
    }


}
