import React, { useState } from 'react';
import { Chart as ChartJs } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import sourceData from "../data/sourceData.json";
import { useTranslation } from 'react-i18next';
import "../../../styles/chardoughnut.css";


export const ChartDoughnut = ({ category, roles, salaries }) => {
    const { t } = useTranslation();
    const roleNames = roles[category];
    const labels = roleNames.map(role => t(role));
    const values = roleNames.map(role => {
        const roleSalaries = salaries.filter(salary => salary.role === role);
        return roleSalaries.length;
    });

    // Your component logic here
    const options = {
        responsive: true,
        onResize: function (chart, size) {
            chart.options.legend.display = size.width > 500; // Adjust this value as needed
        }
    }

    const data = {
        labels: labels,
        datasets: [{
            label: "Grafico por el poder Perruno",
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
            <div style={{ backgroundColor: '#2c2c2c', padding: '25px', margin: '25px', borderRadius: '20px' }}>
                <h1 className="responsive-header" style={{ color: '#eaeaea', marginBottom: '20px' }}>{t('Role VS Entries')}</h1>
                <Doughnut
                    data={data} options={options}/>
            </div>
        </div>
    );

}
