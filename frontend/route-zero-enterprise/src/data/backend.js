const deployed = false;

const deploy = {
    ip: "http://34.226.134.137",
    port: 8080,
    endpoint: "/get_predictions" 
}

const develop = {
    ip: "http://localhost",
    port: 8080,
    endpoint: "/get_predictions"
};

//endpoint exposed 
export const exposedEndpoints = deployed ? deploy : develop;
