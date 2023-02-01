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

@SpringBootTest
public class ServerCSVTests {

    // a sanitary concrete implementation of MultipartFile to test FileUploadService with
    private class TestFile implements MultipartFile {

        private final String content;

        TestFile(String content) {
            this.content = content;
        }

        @Override
        public String getName() {
            return "CSV";
        }

        @Override
        public String getOriginalFilename() {
            return "CSV";
        }

        @Override
        public String getContentType() {
            return ".csv";
        }

        @Override
        public boolean isEmpty() {
            return false;
        }

        @Override
        public long getSize() {
            return content.length();
        }

        @Override
        public byte[] getBytes() throws IOException {
            return content.getBytes();
        }

        @Override
        public InputStream getInputStream() throws IOException {
            return new ByteArrayInputStream(this.getBytes());
        }

        @Override
        public void transferTo(File dest) throws IOException, IllegalStateException {
            throw new IOException("This file cannot be transferred; TestFile is for testing purposes");
        }
    }

    //what we're testing
    private final FileUploadService fs = new FileUploadService();

    private final String CSV_VALID_STR = Helper.loadFileAsText("src/main/resources/VALID.csv");
    private final MultipartFile CSV_VALID_FILE = new TestFile(CSV_VALID_STR);
    private final String CSV_VALID_STR_SMALL = Helper.loadFileAsText("src/main/resources/VALID_SMALL.csv");
    private final MultipartFile CSV_VALID_FILE_SMALL = new TestFile(CSV_VALID_STR_SMALL);

    //test helper method
    private String listToLines(List<String> xs){
        return xs.stream().reduce("", (x, y) -> x + "\n" + y).trim();
    }

    // tests fs.upload()

    @Test
    void uploadGivenTwoCSVsShouldFail(){
        assertTrue(fs.upload(CSV_VALID_STR, CSV_VALID_FILE, true).getResponse().contains("error"));
    }

    @Test
    void uploadGivenNoCSVsShouldFail(){
        assertTrue(fs.upload(null, null, true).getResponse().contains("error"));
    }

    @Test
    void uploadShouldTurnValidCSVStringSmallToLines(){
        fs.upload(CSV_VALID_STR_SMALL, null, true);
        assertEquals(listToLines(fs.getLastFileAsLines()), CSV_VALID_STR_SMALL.trim());
    }

    @Test
    void uploadShouldTurnValidCSVStringToLines(){
        fs.upload(CSV_VALID_STR, null, true);
        assertEquals(listToLines(fs.getLastFileAsLines()), CSV_VALID_STR.trim());
    }

    @Test
    void uploadShouldTurnValidCSVMultipartSmallToLines(){
        fs.upload(null, CSV_VALID_FILE_SMALL, true);
        assertEquals(listToLines(fs.getLastFileAsLines()), CSV_VALID_STR_SMALL.trim());
    }

    @Test
    void uploadShouldTurnValidCSVMultipartToLines(){
        fs.upload(null, CSV_VALID_FILE, true);
        assertEquals(listToLines(fs.getLastFileAsLines()), CSV_VALID_STR.trim());
    }

    // tests fs.upload() & fs.process()

//    @Test
//    void

}
