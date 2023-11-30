import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { Link, useParams } from 'react-router-dom';
import '../../styles/home.css';
import { ChartLine } from './chars/charLine';
import { ChartDoughnutCard } from './chars/chartDoughnutCard';


export const SpectPages = () => {
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
                <table className="table-bordered">
                    <thead>
                        <tr>
                            <th>Years of experience</th>
                            <th>Role Name</th>
                            <th>Category</th>
                            <th>City</th>
                            <th>Country</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData && filteredData.sort((a, b) => a.years_of_experience - b.years_of_experience).map((item, index) => (
                            <tr key={index}>
                                <td>{item.years_of_experience}</td>
                                <td>{item.role}</td>
                                <td>{item.category}</td>
                                <td>{item.city}</td>
                                <td>{item.country}</td>
                                <td>{item.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='container p-5 m-5 text-center mx-auto'>
                <div className='madreGrafico row'>
                    <div className='col-6 hijo1 mx-auto'>
                        <ChartLine data={filteredData} />
                    </div>
                    <div className='col-6 hijo2'>
                        <ChartDoughnutCard data={filteredData} />
                    </div>
                </div>
            </div>

            <div className="text-center">
                <Link to='/dashboard' className='backButton'>Go back to the main page</Link>
            </div>
        </div>
    );
};
