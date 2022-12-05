import React, {useEffect} from "react";
import Chart from 'chart.js/auto'

export const JourneysChart2 = (props) => {

    useEffect(() => {
        const ctx = document.getElementById(props.chartId);
        const myChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Car", "Bus", "Plane", "Train "],
                datasets: [
                    {
                        data: [12, 19, 3, 5],
                        backgroundColor: "lightgreen",
                        borderColor: "lightgreen",
                        borderWidth: 1,
                        borderRadius: 10
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Journeys',
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
    }, []);

    return (
        <canvas id={props.chartId}/>
    )

}