
/*

outline of response
[
    {
        currentCarbonKgCo2e,
        newCarbonKgCo2e (just a weighted average; sum{emissions * probability}),
        alternatives[
            {
                transport
                probability
                CO2e
            },{
                transport
                probability
                CO2e 
            }, ...
        ]
    },{
        currentCarbonKgCo2e,
        newCarbonKgCo2e,
        alternatives[
            ...
        ]
    },
    ...
]

ideas for generating the required graphs

[before]
transport counts -> tally up distinct travel types over the response array 
CO2e -> total up CO2e contributions of each transport type, this can be done by mapping a surface-level parse of the csv and indexing CO2e and adding to correspoding travel type

[after]
transport counts -> do weighted sum of probabilities across every travel record, then round OR take the largest probability for each travel record and tally this way
CO2e -> tally up probability weighted CO2e across every travel record, allocate it to the corresponding travel type 

*/

export const tallyList = (xs) => {
    const tally = {}; //empty map
    xs.map(x => {
        const id = `${x}`; 
        if(tally[id] === undefined) { tally[id] = 1; }
        else{ tally[id]++; }
        return x; //doesnt mutate, only produces side-effects
    })
    return tally;
}
 
//gets only the distinct items of a list
export const listToSet = (xs) => { 
    return [... new Set(xs)]
}

export const mapToPairs = (keys, tally) => {
    const pairs = [];
    keys.map(key => {
        pairs.push([key, tally[key]]);
        return key;
    })
    return pairs;
}

export const getTransportsCSV = (text) => {
    return text.split(/[\r\n]/).slice(1).map(x => x.split(',').at(-1));
}

export const journeyBars = (csvBlob) => {
    return csvBlob
    .text()
    .then((text) => {
        const transports = getTransportsCSV(text);
        const uniqueTransports = listToSet(transports);
        const transportTally = tallyList(transports); //the first line is not a travel type 
        const pairs = mapToPairs(uniqueTransports, transportTally);
        return pairs;
    });
}

//maps transport methods in CSV to records in the response
export const emissionBars = (csvBlob, response, fieldName) => {
    return csvBlob
    .text()
    .then((text) => {
        const transports = getTransportsCSV(text);
        const uniqueTransports = listToSet(transports);
        const co2Tally = {};
        uniqueTransports.map(x => { 
            co2Tally[x] = 0; 
            return x;
        }); //fresh map
        transports.map((x, i) => {
            co2Tally[x] += response.predictions[i][fieldName];
            return x;
        })
        const pairs = mapToPairs(uniqueTransports, co2Tally);
        
        return transform(pairs, 10);
    });
}

//takes lists of pairs [<field>, <data point for transforming>]
export const transform = (xs, lowerCutoff) => {

    const xsMap = xs.map(x => {
        let xTransform = x[1];
        //optional data transformations
        //xTransform = Math.round(xTransform);
        if (xTransform > lowerCutoff) {
            return [x[0], xTransform];
        }else{
            return [x[0], -1];
        }
    });
    const xsFilter = xsMap.filter(x => x[1] != -1); //removes those set to be removed
    return xsFilter;
}

export const predictJourneyBars = (response) => {
    const transportSet = new Set();
    const transportTally = {};
    response.predictions.map(predict => {
        predict.alternatives.map(alternative => {
            const transport = alternative.transport.type;
            transportSet.add(transport);
            if(transportTally[transport] === undefined) {
                transportTally[transport] = alternative.probability;
            }else{
                transportTally[transport] += alternative.probability;
            }
        });
    });
    const transportList = new Array(... transportSet);
    const pairs = mapToPairs(transportList, transportTally);

    return transform(pairs, 0.5);
}
