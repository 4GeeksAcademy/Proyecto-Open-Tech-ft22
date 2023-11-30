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
                        {filteredData && filteredData.map((item, index) => (
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
            <div className='madreGrafico'>
                <div className='hijo1'>
                    <ChartLine category={active} roles={roles} salaries={store.salaries}/>
                </div>
                <div className='hijo2'>
                    <ChartDoughnutCard category={active} roles={roles} salaries={store.salaries}/>
                </div>
            </div>

            <div className="text-center">
                <Link to='/dashboard' className='backButton'>Go back to the main page</Link>
            </div>
        </div>
    );
};
