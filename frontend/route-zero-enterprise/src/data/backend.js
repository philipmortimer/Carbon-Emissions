const deployed = false;

const deploy = {
    ip: "https://application-e8.vzjfxzf7sdt.eu-gb.codeengine.appdomain.cloud",
    port: 443,
    endpoint: "/get_predictions" 
}

const develop = {
    ip: "http://localhost",
    port: 3001,
    endpoint: "/get_predictions" 
};

//endpoint exposed 
export const exposedEndpoints = false ? deploy : develop;
