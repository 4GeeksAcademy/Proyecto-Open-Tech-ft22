import React, { useState } from 'react';
import { Chart as ChartJs } from 'chart.js';
import { Line } from 'react-chartjs-2';

import sourceData from "../data/sourceData.json";


export const ChartsLine = () => {
    const [labels, setLabels] = useState(sourceData.map((data) => data.label))
    const [values, setValues] = useState(sourceData.map((data) => data.value))

    // Your component logic here

    const data = {
        labels: labels,
        datasets: [{
            label: "Grafico por el poder Perruno",
            data: values,
            backgroundColor: [
                'rgba(255, 99, 132,0)',
                'rgba(255, 159, 64,0)',
                'rgba(255, 205, 86,0)',
                'rgba(75, 192, 192,0)',
                'rgba(54, 162, 235,0)',
                'rgba(153, 102, 255,0)',
                'rgba(201, 203, 207,0)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            borderWidth: 1
        }]
    };


    return (
        <div>
            <div>
                <h1>Linea y no de la dura</h1>
                <Line
                    data={data}
                />
            </div>
        </div>
    );

}
