import React, { useState } from 'react';
import { Chart as ChartJs } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import sourceData from "../data/sourceData.json";
import { useTranslation } from 'react-i18next';


export const ChartDoughnutCard = ({ data }) => {
    // Get unique countries
    const labels = [...new Set(data.map(item => item.country))];
    const { t } = useTranslation();

    // Calculate total amount for each country
    const values = labels.map(country => {
        const countryData = data.filter(item => item.country === country);
        const sum = countryData.reduce((total, item) => total + item.amount, 0);
        return sum / countryData.length;
    });

    // Your component logic here
    const options = {
        responsive: true,
        onResize: function (chart, size) {
            chart.options.legend.display = size.width > 500; // Adjust this value as needed
        }
    }

    const chartData = {
        labels: labels,
        datasets: [{
            label: "Salaries",
            data: values,
            backgroundColor: [
                /*Azul*/ 'rgba(1, 97, 237, 0.5)',
                /*Morado*/ 'rgba(227, 87, 255, 0.5)',
                /*Menos morado*/ 'rgba(175, 77, 255, 0.5)',
                /*Rosado*/ 'rgba(117, 66, 255, 0.5)',
                /*Fucsia*/ 'rgba(56, 59, 255, 0.5)',
                /*Sandia*/ 'rgba(46, 109, 255, 0.5)',
                /*Naranja*/ 'rgba(36, 164, 255, 0.5)',
                /*Salmon*/ 'rgba(26, 224, 255, 0.5)',
                /*Gold*/ 'rgba(15, 255, 219, 0.5)',
                /*Amarillo*/ 'rgba(5, 255, 147, 0.5)'
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
            <div>
                <h1 className='mb-3' style={{ color: 'white' }}>{t('Country VS Average')}</h1>
                <Doughnut
                    data={chartData} options={options} />
            </div>
        </div>
    );

}
