import React from "react";
import CanvasJSReact from '../../canvasjs.react';


export const Chart = () => {

    const options = {
        axisY: {
            title: "Journeys",
            gridThickness: 1,
            lineThickness: 2,
            gridColor: "lightgrey",
            lineColor: "lightgrey",
            tickThickness: 0,
            gridDashType: "dash"
        },
        axisX: {
            lineThickness: 2,
            tickThickness: 0,
            lineColor: "lightgrey"
        },
        data: [{
            type: "column",
            dataPoints: [
                {label: "Car", y: 60, color: "lightgreen"},
                {label: "Bus", y: 10, color: "lightgreen"},
                {label: "Plane", y: 100, color: "lightgreen"},
                {label: "Train", y: 40, color: "lightgreen"},
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
