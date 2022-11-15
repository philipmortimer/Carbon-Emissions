export const params = {
    ip: "localhost",
    port: 8080,
    endpoint: "/api/get_predictions" 
};

export const client = {
    request_id: "" //store in localstorage? this relates to updating the policy & re-requesting graphs on visualise page 
};