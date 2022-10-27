package com.routezeroenterprise.server;

public class testAPI {

    // Variables here are what will be returned in JSON format by the server
    private final String content;

    public testAPI(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }
}
