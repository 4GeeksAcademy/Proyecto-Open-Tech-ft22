import React, { useState } from 'react';
import { Chart as ChartJs } from 'chart.js';
import { Line } from 'react-chartjs-2';
import sourceData from "../data/sourceData.json";
import { useTranslation } from 'react-i18next';

export const ChartLine = ({ data }) => {
    const labels = data.map((item) => item.years_of_experience);
    const values = data.map((item) => item.amount);
    const { t } = useTranslation();

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

    // Function to get color based on index
    const getColor = (index) => {
        const colorPalette = [
            'rgb(1, 97, 237)',
            'rgb(227, 87, 255)',
            'rgb(175, 77, 255)',
            'rgb(117, 66, 255)',
            'rgb(56, 59, 255)',
            'rgb(46, 109, 255)',
            'rgb(36, 164, 255)',
            'rgb(26, 224, 255)',
            'rgb(15, 255, 219)',
            'rgb(5, 255, 147)'
        ];

        return colorPalette[index % colorPalette.length];
    };

    // Create dynamic pointBackgroundColor and pointBorderColor arrays
    const pointBackgroundColor = data.map((item, index) => getColor(index));
    const pointBorderColor = data.map((item, index) => getColor(index));

    const chartData = {
        labels: labels,
        datasets: [{
            label: "Salaries",
            data: values,
            backgroundColor: '#464646',
            borderColor: 'rgba(1, 97, 237, 1)',
            borderWidth: 2,
            pointBackgroundColor: pointBackgroundColor,
            pointBorderColor: pointBorderColor,
            pointRadius: 5
        }]
    };

    return (
        <div>
            <div>
                <h1 className='mb-3' style={{ color: 'white' }}>{t('Experience VS Salary')}</h1>
                <Line
                    data={chartData} options={options}
                />
            </div>
        </div>
    );
}
