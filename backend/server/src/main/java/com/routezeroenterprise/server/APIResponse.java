package com.routezeroenterprise.server;

/**
 * Wrapper class for an api response. Essentially just stores a JSON response string
 * which abstracts the API response.
 */
public class APIResponse {
    /**
     * The response JSON.
     */
    private final String response;

    /**
     * Creates the API response.
     * @param jsonResponse The response JSON string.
     */
    public APIResponse(String jsonResponse) {
        this.response = jsonResponse;
    }

    /**
     * Gets the JSON API response.
     * @return The response.
     */
    public String getResponse() {
        return response;
    }
}
