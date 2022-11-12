package com.routezeroenterprise.server;

public class apiResponse {

    private final String response;

    public apiResponse(String jsonResponse) {
        this.response = jsonResponse;
    }

    public String getResponse() {
        return response;
    }
}
