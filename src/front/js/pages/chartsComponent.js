import React from 'react';
import { Bar } from 'react-chartjs-2';

export const ChartsComponent = () => {
    // Your component logic here

    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: 'Example Dataset',
                data: [12, 19, 8, 5, 10, 3],
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };

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
            <h1>ChartsComponent</h1>
            <Bar data={data} options={options} />
        </div>
    );

}
