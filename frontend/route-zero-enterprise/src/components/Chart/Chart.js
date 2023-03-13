import React, { useEffect } from 'react'
import Chart from 'chart.js/auto'

export const BarChart = ({ chartId, header, bars }) => {
  useEffect(() => {
    const ctx = document.getElementById(chartId)
    if (bars !== undefined) {
      const labels = bars.map(x => x[0]).map(x => x === "foot" ? "Foot" : 
        x === "bike" ? "Bike" :
        x === "electricScooter" ? "Electric scooter" :
        x === "petrolCar" ? "Petrol car" :
        x === "dieselCar" ? "Diesel car" :
        x === "hybridCar" ? "Hybrid car" :
        x === "electricCar" ? "Electric car" :
        x === "taxi" ? "Taxi" :
        x === "bus" ? "Bus":
        x === "coach" ? "Coach":
        x === "train" ? "Train":
        x === "eurostar" ? "Eurostar":
        x === "lightRail" ? "Light rail":
        x === "tram" ? "Tram":
        x === "subway" ? "Subway":
        x === "flight" ? "Flight":
        x === "ferry" ? "Ferry" : "")
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
          <canvas id={chartId}/>
      </>
  );

}

