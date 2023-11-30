import React, { useState } from 'react';
import { Chart as ChartJs } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import sourceData from "../data/sourceData.json";


export const ChartDoughnutCard = ({ data }) => {
    // Get unique countries
    const labels = [...new Set(data.map(item => item.country))];

    // Calculate total amount for each country
    const values = labels.map(country => {
        const countryData = data.filter(item => item.country === country);
        const sum = countryData.reduce((total, item) => total + item.amount, 0);
        return sum / countryData.length;
    });

    // Your component logic here

    const chartData = {
        labels: labels,
        datasets: [{
            label: "Grafico por el poder Perruno",
            data: values,
            backgroundColor: [
                /*Azul*/ 'rgba(15, 15, 255, 0.2)',
                /*Morado*/ 'rgba(139, 15, 255, 0.2)',
                /*Menos morado*/ 'rgba(202, 10, 255, 0.2)',
                /*Rosado*/ 'rgba(255, 5, 243, 0.2)',
                /*Fucsia*/ 'rgba(250, 0, 104, 0.2)',
                /*Sandia*/ 'rgba(245, 0, 37, 0.2)',
                /*Naranja*/ 'rgba(240, 24, 0, 0.2)',
                /*Salmon*/ 'rgba(235, 86, 0, 0.2)',
                /*Gold*/ 'rgba(230, 145, 0, 0.2)',
                /*Amarillo*/ 'rgba(224, 202, 0, 0.2)',
            ],
            borderColor: [
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
            borderWidth: 1
        }]
    };

    return (
        <div>
            <div>
                <h1>Tortita</h1>
                <Doughnut
                    data={chartData} />
            </div>
        </div>
    );

}
