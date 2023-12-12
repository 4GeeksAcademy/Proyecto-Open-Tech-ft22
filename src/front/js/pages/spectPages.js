import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { Link, useParams } from 'react-router-dom';
import '../../styles/home.css';
import { ChartLine } from './chars/charLine';
import { ChartDoughnutCard } from './chars/chartDoughnutCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';


export const SpectPages = () => {
    const { t } = useTranslation();
    const { roleName } = useParams();
    console.log('roleName:', roleName);
    const { store, actions } = useContext(Context);
    const [data, setData] = useState([]);


    useEffect(() => {
        fetch(`${store.apiURL}/api/salary`)
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    const filteredData = data ? data.filter(item => item.role === roleName) : undefined;
    console.log(data, roleName);

    return (
        <div>
            <div>
                <div className="scrollable-table">
                    <table className="table-bordered">
                        <thead>
                            <tr>
                                <th>{t('Years of experience')}</th>
                                <th>{t('Role Name')}</th>
                                <th>{t('Category')}</th>
                                <th>{t('City')}</th>
                                <th>{t('Country')}</th>
                                <th>{t('Amount')}</th>
                                <th>{t('Verified')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData && filteredData.sort((a, b) => a.years_of_experience - b.years_of_experience).map((item, index) => (
                                <tr key={index}>
                                    <td>{item.years_of_experience}</td>
                                    <td>{t(item.role)}</td>
                                    <td>{item.category}</td>
                                    <td>{item.city}</td>
                                    <td>{item.country}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.is_verified ? <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#ba4ff8', marginLeft: '20px' }} /> : null}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='container p-5 m-5 text-center mx-auto'>
                <div className='madreGrafico row'>
                        <div className='col-lg-6 col-md-12 hijo1 mx-auto'>
                            <ChartLine data={filteredData} />
                        </div>
                        <div className='col-lg-6 col-md-12 hijo2'>
                            <ChartDoughnutCard data={filteredData} />
                        </div>
                </div>
            </div>

            <div className="text-center">
                <Link to='/dashboard' className='backButton'>{t('Go back to the main page')}</Link>
            </div>
        </div>
    );
};
