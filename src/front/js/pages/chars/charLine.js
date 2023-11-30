import React, { useState } from 'react';
import { Chart as ChartJs } from 'chart.js';
import { Line } from 'react-chartjs-2';

import sourceData from "../data/sourceData.json";


export const ChartLine = ({ data }) => {
    const labels = data.map((item) => item.years_of_experience);
    const values = data.map((item) => item.amount);

    // Your component logic here
    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }],
            xAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    const chartData = {
        labels: labels,
        datasets: [{
            label: "Salaries",
            data: values,
            backgroundColor: '#121212',
            borderColor: 'rgba(15, 15, 255, 1)', // Use a single color for the line
            borderWidth: 2,
            pointBackgroundColor: [
                /*Azul*/ 'rgb(15, 15, 255)',
                /*Morado*/ 'rgb(139, 15, 255)',
                /*Menos morado*/ 'rgb(202, 10, 255)',
                /*Rosado*/ 'rgb(255, 5, 243)',
                /*Fucsia*/ 'rgb(250, 0, 104)',
                /*Sandia*/ 'rgb(245, 0, 37)',
                /*Naranja*/ 'rgb(240, 24, 0)',
                /*Salmon*/ 'rgb(235, 86, 0)',
                /*Gold*/ 'rgb(230, 145, 0)',
                /*Amarillo*/ 'rgb(224, 202, 0)'
            ],
            pointBorderColor: [
                /*Azul*/ 'rgb(15, 15, 255)',
                /*Morado*/ 'rgb(139, 15, 255)',
                /*Menos morado*/ 'rgb(202, 10, 255)',
                /*Rosado*/ 'rgb(255, 5, 243)',
                /*Fucsia*/ 'rgb(250, 0, 104)',
                /*Sandia*/ 'rgb(245, 0, 37)',
                /*Naranja*/ 'rgb(240, 24, 0)',
                /*Salmon*/ 'rgb(235, 86, 0)',
                /*Gold*/ 'rgb(230, 145, 0)',
                /*Amarillo*/ 'rgb(224, 202, 0)'
            ],
            pointRadius: 5
        }]
    };



    return (
        <div>
            <div>
                <h1 className='mb-3' style={{color: '#959595'}}>Experience VS Salary</h1>
                <Line
                    data={chartData} options={options}
                />
            </div>
        </div>
    );
}
