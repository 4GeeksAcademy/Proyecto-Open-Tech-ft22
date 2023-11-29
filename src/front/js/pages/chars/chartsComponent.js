import React, { useState } from 'react';
import { Chart as ChartJs } from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

import sourceData from "../data/sourceData.json";


export const ChartsComponent = () => {
    const [labels, setLabels] = useState(sourceData.map((data) => data.label))
    const [values, setValues] = useState(sourceData.map((data) => data.value))

    // Your component logic here

    const data = {
        labels: labels,
        datasets: [{
            label: "Grafico por el poder Perruno",
            data: values,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',

            ],
            borderWidth: 1
        }]
    }

    const options = {
        scales: {
            x: {
                type: 'linear', // change this to your desired scale type
                beginAtZero: true,
            },
            y: {
                type: 'linear', // change this to your desired scale type
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <div>
                <h1>ChartsComponent</h1>
                <Bar
                    data={data} />
            </div>
            <div>
                <h1>Tortita</h1>
                <Doughnut
                    data={data} />
            </div>
            <div>
                <h1>Linea y no de la dura</h1>
                <Line
                    data={data} />

            </div>

        </div>
    );

}
