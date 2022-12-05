import React, {useEffect} from "react";
import Chart from 'chart.js/auto'

export const JourneysChart2 = (props) => {

    let color = 'rgb(153, 242, 199)'
    if(props.chartId === '3'){
        color = 'rgb(0, 223, 116)'
    }

    useEffect(() => {
        const ctx = document.getElementById(props.chartId);
        const myChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Car", "Bus", "Plane", "Train "],
                datasets: [
                    {
                        data: [12, 19, 3, 5],
                        backgroundColor: color,
                        borderColor: color,
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
                        text: '        Journeys',
                        position: 'top',
                        align: 'start',
                        font: {
                            size: 12,
                            family: "tahoma",
                        },
                        padding: 15

                    },
                    axis: {

                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y :{
                        border: {
                            width: 3,
                            color: 'lightgrey'
                        }
                    },
                    x: {
                        border: {
                            width: 3,
                            color: 'lightgrey'
                        },
                        grid: {
                            display: false
                        }
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