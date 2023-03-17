import React, { useEffect } from 'react'
import Chart from 'chart.js/auto'
import { travelKind } from '../../data/travelkind.js';

export const BarChart = ({ chartId, header, bars }) => {
  useEffect(() => {
    const ctx = document.getElementById(chartId)
    if (bars !== undefined) {
      const labels = bars.map(x => x[0]).map(x => 
        x === travelKind.foot ? "Foot" : 
        x === travelKind.bike ? "Bike" :
        x === travelKind.electricScooter ? "Electric scooter" :
        x === travelKind.petrolCar ? "Petrol car" :
        x === travelKind.dieselCar ? "Diesel car" :
        x === travelKind.hybridCar ? "Hybrid car" :
        x === travelKind.electricCar ? "Electric car" :
        x === travelKind.taxi ? "Taxi" :
        x === travelKind.bus ? "Bus":
        x === travelKind.coach ? "Coach":
        x === travelKind.train ? "Train":
        x === travelKind.eurostar ? "Eurostar":
        x === travelKind.lightRail ? "Light rail":
        x === travelKind.tram ? "Tram":
        x === travelKind.subway ? "Subway":
        x === travelKind.flight ? "Flight":
        x === travelKind.ferry ? "Ferry" : x)
      const values = bars.map(x => x[1])

      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              data: values,
              backgroundColor: '#00DF74',
              borderColor: '#00DF74',
              borderWidth: 1,
              borderRadius: 5
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: header,
              font: {
                size: 15,
                family: 'tahoma'
              }
            },
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              display: true
            },
            y: {
              display: true,
              type: 'linear'
            }
          }
        }
      })
      return () => {
        myChart.destroy()
      }
    }
  }, [bars, chartId, header])
  // 01/26/23 chardID and header were added to mitigate 'react-hooks/exhaustive-deps' warning

  return (
      <>
          <span className="chart-overlay">{ bars === undefined || bars.length === 0
          ? "Sorry, not enough data"
          : "" }</span>
          <canvas data-testid={header} id={chartId}/>
      </>
  );
}
