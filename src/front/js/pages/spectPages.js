import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';

export const SpectPages = () => {
    const { store, actions } = useContext(Context);
    return (
        <div>
            <div>
                <table style={{ width: '100%' }}>
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
                        <tr>
                            <td>2</td>
                            <td>role name</td>
                            <td>category name</td>
                            <td>Santiago</td>
                            <td>Chile</td>
                            <td>45000</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>role name</td>
                            <td>category name</td>
                            <td>Santiago</td>
                            <td>Chile</td>
                            <td>45000</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style={{ marginTop: "20px", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Link to="/dashboard">
                    Go back
                </Link>
            </div>
        </div>

    )
};

export default SpectPages;
