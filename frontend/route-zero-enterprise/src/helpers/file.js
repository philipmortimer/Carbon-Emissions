export const getTransports = (file) => {
    /* getTransportLines :: file -> Promise<string[]>  
       Takes a file and returns a promise of the array of transports.
       Accepts JSON or CSV. 
    */
    const fileStatus = fileTypeAndValidation(file.name)
    if (!fileStatus.isValidFile) { 
        // Checks file validity. Note that this code path should not be reachable. However, this
        // error message remains to help debugging should this code ever run.
        throw new Error("File must end in either '.json' or '.csv'. Filename: " + file.name);
    }
    else if (fileStatus.isCsvFile) {
        return file.text()
        .then((text) => {
            /* Converts text into transports using the following transformations:
            - Splits it by line (one record per line). Note regex handles '\n' and '\r\n' as valid new line chars.
            - Slices the nought element as element 0 is just the field headings
            - Splits the record by comma and accesses the transport method (last element of record)
            */
            return text.split(/\r\n|\n/).slice(1).map(x => x.split(',').at(-1));
        }); 

    } else if (fileStatus.isJsonFile) {
        return file.text()
            .then((text) => {
                const transportJson = JSON.parse(text);
                return transportJson.map((record) => record.transport); 
            });
    } else{
        throw new Error("Reached code path thought to be unreachable for file validation")
    }
}

/**
 * Checks file validity and type.
 * @param {*} name File name
 * @returns The file status (whether it is a CSV file, JSON file or invalid file)
 */
export function fileTypeAndValidation (name) {
    let isCsv = false;
    let isJson = false;
    let isValid = true;
    if (name.length >= 5 && name.slice(-4).toLowerCase() === '.csv') isCsv = true;
    else if (name.length >= 6 && name.slice(-5).toLowerCase() === '.json') isJson = true;
    else isValid = false;
    return {
        isValidFile: isValid,
        isCsvFile: isCsv,
        isJsonFile: isJson
    }
}