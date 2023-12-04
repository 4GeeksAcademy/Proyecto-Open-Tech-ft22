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
                /*Azul*/ 'rgba(1, 97, 237, 0.3)',
                /*Morado*/ 'rgba(227, 87, 255, 0.3)',
                /*Menos morado*/ 'rgba(175, 77, 255, 0.3)',
                /*Rosado*/ 'rgba(117, 66, 255, 0.3)',
                /*Fucsia*/ 'rgba(56, 59, 255, 0.3)',
                /*Sandia*/ 'rgba(46, 109, 255, 0.3)',
                /*Naranja*/ 'rgba(36, 164, 255, 0.3)',
                /*Salmon*/ 'rgba(26, 224, 255, 0.3)',
                /*Gold*/ 'rgba(15, 255, 219, 0.3)',
                /*Amarillo*/ 'rgba(5, 255, 147, 0.3)'
            ],
            borderColor: [
                /*Azul*/ 'rgba(1, 97, 237)',
                /*Morado*/ 'rgba(227, 87, 255)',
                /*Menos morado*/ 'rgba(175, 77, 255)',
                /*Rosado*/ 'rgba(117, 66, 255)',
                /*Fucsia*/ 'rgba(56, 59, 255)',
                /*Sandia*/ 'rgba(46, 109, 255)',
                /*Naranja*/ 'rgba(36, 164, 255)',
                /*Salmon*/ 'rgba(26, 224, 255)',
                /*Gold*/ 'rgba(15, 255, 219)',
                /*Amarillo*/ 'rgba(5, 255, 147)'
            ],
            borderWidth: 2
        }]
    };

    return (
        <div>
            <div style={{ backgroundColor: '#161616', padding: '25px', margin: '25px', borderRadius: '20px' }}>
                <h1 style={{ color: '#eaeaea', marginBottom: '20px' }}>Role VS Entries</h1>
                <Doughnut
                    data={data} />
            </div>
        </div>
    );

}
