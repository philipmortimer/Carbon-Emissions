export const fetchPOST = async (url, data) => { //temporarily, this function only logs to the console and returns nothing

    //console.log(data)
    //console.log(JSON.stringify(data))

    fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    .then((raw) => {
        return raw.json()
    })
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(`error when fetching (POST) from ${url}; ${err}`);
    });


}