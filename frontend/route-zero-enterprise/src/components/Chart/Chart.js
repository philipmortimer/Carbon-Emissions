import React, {useEffect} from "react";
import Chart from 'chart.js/auto';

export const BarChart = (props) => {

    useEffect(() => {
        const ctx = document.getElementById(props.chartId);
        if(props.bars !== undefined){

            const labels = props.bars.map(x => x[0]);
            const values = props.bars.map(x => x[1]);
            const header = props.header;

            const myChart = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            data: values,
                            backgroundColor: "#00DF74",
                            borderColor: "#00DF74",
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
                                family: "tahoma"
                            }
                        },
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            display: true,
                        },
                        y: {
                            display: true,
                            type: 'linear'
                        }
                    }
                }
            });
            return () => {
                myChart.destroy()
            }
        }
    }, [props.bars]);

    return (
        <canvas id={props.chartId}/>
    )

}