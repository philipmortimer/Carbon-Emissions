package com.routezeroenterprise.server;

import com.opencsv.CSVReader;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class FileUploadService {

    public apiResponse uploadFile(MultipartFile file) {

        BufferedReader br;
        //List<String> result = new ArrayList<>();
        String resHolder = "";
        try {
            String line;
            InputStream is = file.getInputStream();
            br = new BufferedReader(new InputStreamReader(is));
            while ((line = br.readLine()) != null) {
                resHolder = resHolder.concat(line + "\t");
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return new apiResponse(resHolder);
    }
}
