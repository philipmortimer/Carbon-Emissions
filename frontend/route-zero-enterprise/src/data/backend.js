
const deployed = false;

const deploy = {
    ip: "depricated",
    port: 443,
    endpoint: "/get_predictions" 
}

const develop = {
    ip: "http://localhost",
    port: 8080,
    endpoint: "/get_predictions"
};

//endpoint exposed 
export const exposedEndpoints = deployed ? deploy : develop;
