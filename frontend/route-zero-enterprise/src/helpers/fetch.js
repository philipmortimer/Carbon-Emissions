
export const fetchPOST = async (url, data) => { //temporarily, this function only logs to the console and returns nothing

    //console.log(data)
    //console.log(JSON.stringify(data))

    let request = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Access-Control-Allow-Origin': 'localhost:3000',//`${params.ip}:${params.port}`,
            'Content-Type': 'application/json'
            // 'Access-Control-Allow-Credentials': true
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: data // body data type must match "Content-Type" header
    };

    //console.log(request);

    return fetch(url, request)
    .then((raw) => {
        return raw.json()
    })
    .then((data) => {
        // Checks to see if backend has been unabled to upload API key.
        // If it has, it returns a different kind of error message (as CSV file is not necessarily invalid).
        if (data.errorApiKey !== undefined) {
            console.error(`error when fetching from ${url}; ${data.errorApiKey} due to API key not being loaded`);
            return {"error": data.errorApiKey};
        } else {
            return {"data": data};
        }
    })
    .catch((err) => {
        console.error(`error when fetching from ${url}; ${err}`);
        return {"error": err};
    });
}