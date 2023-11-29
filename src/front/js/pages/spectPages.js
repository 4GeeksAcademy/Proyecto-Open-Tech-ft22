import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';
import '../../styles/home.css';

export const SpectPages = ({ selectedRole }) => {
    const { store, actions } = useContext(Context);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`${store.apiURL}/api/salary`)
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    const filteredData = data.filter(item => item.role === selectedRole);

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
                        {filteredData.map((item, index) => (
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
        </div>
    );
};
