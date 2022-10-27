package com.routezeroenterprise.server;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class testAPIController {

    private final static String template = "Hello, %s";

    @GetMapping("/")
    public testAPI apiCall(@RequestParam(value = "name", defaultValue = "World") String name) {
        return new testAPI(String.format(template, name));
    }
}
