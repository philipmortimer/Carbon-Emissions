import { getTransports } from "./file.js";


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

const EMISSION_LOWER_LIM = 10; //10
const JOURNEY_LOWER_LIM = 0.1; //0.1

export const tallyList = (xs) => {
  const tally = {} // empty map
  xs.map(x => {
    const id = `${x}`
    if (tally[id] === undefined) { tally[id] = 1 } else { tally[id]++ }
    return x // doesnt mutate, only produces side-effects
  })
  return tally
}

// gets only the distinct items of a list
export const listToSet = (xs) => {
  return [...new Set(xs)]
}

export const mapToPairs = (keys, tally) => {
  const pairs = []
  keys.map(key => {
    pairs.push([key, tally[key]])
    return key
  })
  return pairs
}

export const journeyBars = (file) => {
  return getTransports(file)
    .then((transports) => {
      const uniqueTransports = listToSet(transports);
      const transportTally = tallyList(transports); // the first line is not a travel type
      const pairs = mapToPairs(uniqueTransports, transportTally);
      return pairs;
    });

// maps transport methods in CSV to records in the response
export const emissionBarsBefore = (file, response) => {
  return getTransports(file)
    .then((transports) => {
      const uniqueTransports = listToSet(transports);
      const co2Tally = {};
      uniqueTransports.map(x => {
        co2Tally[x] = 0
        return x;
      }); // fresh map
      transports.map((x, i) => {
        co2Tally[x] += response.predictions[i] === undefined ? 0 : response.predictions[i]['currentCarbonKgCo2e'] // handles undefined
        return x;
      });
      const pairs = mapToPairs(uniqueTransports, co2Tally);
      return transform(pairs, EMISSION_LOWER_LIM);
    });
}



// Calculates updated emissions for each transport method by multiplying probability of it occuring
// with the emissions it would induce
export const emissionBarsAfter = (file, response) => {
  return file
    .text() //superfluous text call to maintain the promise return type 
    .then(() => {
      // Fills map of transportType, totalPredictedEmissions
      let transEmissionMap = new Map()
      for (let journeyIndex = 0; journeyIndex < response.predictions.length; journeyIndex++) {
        const jounrey = response.predictions[journeyIndex]
        for (let altIndex = 0; altIndex < jounrey.alternatives.length; altIndex++) {
          const alternative = jounrey.alternatives[altIndex]
          const type = alternative.transport.type
          // If journey has no registered emissions yet, puts it in the map
          if (!transEmissionMap.has(type)) {
            transEmissionMap.set(type, 0)
          }
          // New emission is probability of transport being taken * emissions from said journey
          transEmissionMap.set(type, 
            transEmissionMap.get(type) + (alternative.probability * alternative.carbonKgCo2e))
        }
      }
      // Converts map to pair array
      const pairs = Array.from(transEmissionMap)
      return transform(pairs, EMISSION_LOWER_LIM)
    })
}

// takes lists of pairs [<field>, <data point for transforming>]
export const transform = (xs, lowerCutoff) => {
  const xsFilter = xs.filter(x => x[1] >= lowerCutoff)
  return xsFilter
}

export const predictJourneyBars = (response) => {
  const transportSet = new Set()
  const transportTally = {}
  response.predictions.map(predict => {
    predict.alternatives.map(alternative => {
      const transport = alternative.transport.type
      transportSet.add(transport)
      if (transportTally[transport] === undefined) {
        transportTally[transport] = alternative.probability
      } else {
        transportTally[transport] += alternative.probability
      }
      return alternative // warning about void arrow function mitigated; no longer mutates predict.alternatives
    })
    return predict // warning about void arrow function mitigated; no longer mutates response.predictions
  })
  const transportList = new Array(...transportSet)
  const pairs = mapToPairs(transportList, transportTally)

  return transform(pairs, JOURNEY_LOWER_LIM)
}
