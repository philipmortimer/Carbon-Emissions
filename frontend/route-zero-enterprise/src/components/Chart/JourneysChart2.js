import React, {useEffect} from "react";
import Chart from 'chart.js/auto'

export const JourneysChart2 = (props) => {

    useEffect(() => {
        const ctx = document.getElementById(props.chartId);
        if(props.journeys !== undefined){
            const myChart = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: props.journeys.map(x => x[0]),
                    datasets: [
                        {
                            data: props.journeys.map(x => x[1]),
                            backgroundColor: "lightgreen",
                            borderColor: "lightgreen",
                            borderWidth: 1,
                            borderRadius: 5
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: props.header,
                            font: {
                                size: 15,
                                family: "tahoma"
                            }
                        },
                        legend: {
                            display: false
                        }
                    }
                }
            });
            return () => {
                myChart.destroy()
            }
        }
    }, [props.journeys]);

    return (
        <canvas id={props.chartId}/>
    )

}