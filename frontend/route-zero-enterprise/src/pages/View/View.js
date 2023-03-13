import React, { useEffect, useState } from 'react'

// components
import './View.scss'
import { BarChart } from '../../components/Chart/Chart.js'
import { PolicySelector } from '../../components/Policy/Policy.js'

// helpers
import { journeyBars, emissionBarsBefore, predictJourneyBars, emissionBarsAfter } from '../../helpers/chart.js'

// data
import { getPolicies } from '../../data/policies.js'

const refreshPolicies = (policies, predictJourneys, predictEmissions, setPredictEmissions, setSavedCO2e) => {
  const savedCO2eBuilder = []
  policies.map(pol => {
    savedCO2eBuilder.push(pol.effect.getCO2eSaved([predictJourneys, () => {}], [predictEmissions, setPredictEmissions]))
    return pol
  })
  setSavedCO2e(savedCO2eBuilder)
}

export const View = (props) => {
  // PairArray<BarName, Number>
  const [beforeJourneys, setBeforeJourneys] = useState([])
  const [beforeEmissions, setBeforeEmissions] = useState([])
  const [predictJourneys, setPredictJourneys] = useState([])
  const [predictJourneysCalculated, setPredictJourneysCalculated] = useState(false)
  const [predictEmissions, setPredictEmissions] = useState([])

  const [policies, setPolicies] = useState(getPolicies())
  const [savedCO2e, setSavedCO2e] = useState([]) // array of numbers (in Kt)

  // console.log(policies);

  useEffect(() => {
    document.title = 'Graphs | RouteZero'
    if (props.file !== null && !predictJourneysCalculated/*predictJourneys.length === 0*/) {
      setPredictJourneysCalculated(true)
      journeyBars(props.file)
        .then((pairs) => {
          setBeforeJourneys(pairs)
        })

      emissionBarsBefore(props.file, props.response)
        .then((pairs) => {
          setBeforeEmissions(pairs)
        })

      setPredictJourneys(predictJourneyBars(props.response))
      
      emissionBarsAfter(props.file, props.response, 'newCarbonKgCo2e')
        .then((pairs) => {
          setPredictEmissions(pairs)
          return pairs
        })
        .then((pairs) => { // This is contained within a promise so data has finished reading before we get to work out CO2e saved
          refreshPolicies(policies, predictJourneyBars(props.response), pairs, setPredictEmissions, setSavedCO2e)
        })
    } else if (props.file === null) { // will eventually be used to refresh CO2e savings on other policy changes
      refreshPolicies(policies, predictJourneys, predictEmissions, setPredictEmissions, setSavedCO2e)
    }
  }, [props.setFile, props.file, props.response, policies, predictJourneys, predictEmissions, predictJourneysCalculated])

  return (
    <>
      {/* <p>{JSON.stringify(props.response)}</p> */}
      <div className='center-grid'>
        <div className='outer'>
          <div className='cell'>
            {/* PolicySelector asks for all prediction data as that is what it is modifying based on policy choices */}
            <PolicySelector policies={policies} setPolicies={setPolicies} journeysState={[predictJourneys, setPredictJourneys]} emissionsState={[predictEmissions, setPredictEmissions]} savedCO2e={savedCO2e} />
          </div>
          <div className='cell'>
            <h1>Visualisation</h1>
            <div className='center-grid2'>
              <div className='inner'>
                <div className='cell'>
                  <h2>Before</h2>
                  <div className='Chart'>
                      <BarChart chartId='1' header='Journeys' bars={beforeJourneys} />
                    </div>
                  <div className='Chart'>
                      <BarChart chartId='2' header='Current Emissions (KgCO2)' bars={beforeEmissions} />
                    </div>
                </div>
                <div className='cell'>
                  <h2>After</h2>
                  <div className='Chart'>
                      <BarChart chartId='3' header='Average Predicted Journeys' bars={predictJourneys} />
                    </div>
                  <div className='Chart'>
                      <BarChart chartId='4' header='Predicted Emissions (KgCO2)' bars={predictEmissions} />
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
