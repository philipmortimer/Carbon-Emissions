package com.routezeroenterprise.server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class FileUploadController {

    @Autowired
    FileUploadService fileUploadService;

    @PostMapping("/upload")
    public apiResponse fileUpload(@RequestParam("file") MultipartFile file){
        return fileUploadService.uploadFile((file));
    }
}
