package com.routezeroenterprise.server;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.multipart.MultipartFile;
import org.xmlunit.builder.Input;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

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
    private static final String CSV_VALID_STR = loadTextFileTest("src/main/resources/VALID.csv");
    /**
     * The contents of a small valid csv file ('VALID_SMALL.csv').
     */
    private static final String CSV_VALID_STR_SMALL = loadTextFileTest("src/main/resources/VALID_SMALL.csv");

    /**
     * A test helper function that loads a file but handles any IO errors that may be thrown.
     * @param path The file path.
     * @return The file contents
     * @throws RuntimeException A runtime exception is thrown if the file can't be loaded
     */
    private static String loadTextFileTest(String path) throws RuntimeException{
        try{
            String contents = Helper.loadFileAsText(path);
            return contents;
        } catch (IOException e) {
            // File has not been loaded due to IO issues. This is a non-recoverable error.
            throw new RuntimeException(e);
        }
    }

    // tests fs.upload()
    // TODO Implement more tests

    /**
     * Tests that an error is thrown if a null is passed as the CSV file contents.
     */
    @Test
    void uploadGivenNoCSVsShouldFail(){
        assertTrue(fs.upload(null).getResponse().contains("error"));
    }

}
