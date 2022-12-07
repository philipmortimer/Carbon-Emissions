const deployed = true;

const deploy = {
    ip: "https://application-e8.vzjfxzf7sdt.eu-gb.codeengine.appdomain.cloud",
    port: 443,
    endpoint: "/get_predictions" 
}

const develop = {
    ip: "http://localhost",
    port: 8080,
    endpoint: "/get_predictions" 
};

export const exposedEndpoints = deployed ? deploy : develop;
