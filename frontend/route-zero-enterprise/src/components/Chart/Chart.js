import React, {useEffect, useState} from "react";
import Chart from 'chart.js/auto';

export const BarChart = ({chartId,  header, bars}) => {

    const [dimensions, setDimensions] = useState({
        h: window.innerHeight,
        w: window.innerWidth
    }); 

    const debounce = (f, args, ms) => { //higher-order function that delays many quickly repeated function calls into one function call 'ms' milliseconds after the last call
        let timer;
        return () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                f(args);
            }, ms);
        }
    }

    const handleResize = () => {
        setDimensions({
            h: window.innerHeight,
            w: window.innerWidth
        });
    }

    window.addEventListener('resize', debounce(handleResize, null, 1000));

    useEffect(() => {
        const ctx = document.getElementById(chartId);
        if(bars !== undefined){

            const labels = bars.map(x => x[0]);
            const values = bars.map(x => x[1]);
            // const header = header;

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

    }, [bars, chartId, header, dimensions]);
    // 01/26/23 chardID and header were added to mitigate 'react-hooks/exhaustive-deps' warning
    // feature-policy-selection-framework: added 'dimensions' to dependency array because the graphs need to rerender when the window changes size.

    return (
        <canvas id={chartId}/>
    )

}