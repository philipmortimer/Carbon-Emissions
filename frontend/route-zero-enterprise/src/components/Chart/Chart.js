import React from "react";
import CanvasJSReact from '../../canvasjs.react';

export const Chart = () => {

    const options = {
        axisY: {
            title: "Journeys",
        },
        axisX:{
            title: "transport methods",
        },
        data: [{
            type: "column",
            dataPoints: [
                {label: "Car", y: 60},
                {label: "Bus", y: 10},
                {label: "Plane", y: 100},
                {label: "Train", y: 40},
            ]
        }]
    }

    return (
        <div>
            <CanvasJSReact.CanvasJSChart options = {options}
            />
        </div>
    )
}
