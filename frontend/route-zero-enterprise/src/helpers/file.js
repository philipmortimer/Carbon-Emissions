const CSV_TYPE = "text/csv";
const JSON_TYPE = "application/json";

export const getTransports = (file) => {
    /* getTransportLines :: file -> Promise<string[]>  
       Takes a file and returns a promise of the array of transports.
       Accepts JSON or CSV. 
    */

    const type = file.type;
    if(type === CSV_TYPE){

        return file.text()
            .then((text) => {
                /* Converts text into transports using the following transformations:
                - Splits it by line (one record per line). Note regex handles '\n' and '\r\n' as valid new line chars.
                - Slices the nought element as element 0 is just the field headings
                - Splits the record by comma and accesses the transport method (last element of record)
                */
                return text.split(/\r\n|\n/).slice(1).map(x => x.split(',').at(-1));
            });   
    }
    
    if(type === JSON_TYPE){

        return file.text()
            .then((text) => {
                const transportJson = JSON.parse(text);
                return transportJson.map((record) => record.transport); 
            });
    }

    throw Error("helpers: file.getTransport; file is of an invalid type (neither CSV nor JSON).");

    // console.log(text);
    // const t = text.split(/\r\n|\n/).slice(1).map(x => x.split(',').at(-1))
    // return t
}