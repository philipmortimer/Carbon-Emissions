const deployed = true;

const deploy = {
    ip: "http://44.205.217.6",
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
