import React, { useState } from 'react';
import { Chart as ChartJs } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import sourceData from "../data/sourceData.json";


export const ChartDoughnut = ({ category, roles, salaries }) => {
    const roleNames = roles[category];
    const labels = roleNames;
    const values = roleNames.map(role => {
        const roleSalaries = salaries.filter(salary => salary.role === role);
        return roleSalaries.length;
    });

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
                <h1>Tortita</h1>
                <Doughnut
                    data={data} />
            </div>
        </div>
    );

}
