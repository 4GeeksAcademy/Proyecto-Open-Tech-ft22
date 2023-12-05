import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import "../../styles/admin.css";


const AdminView = () => {
    const { store } = useContext(Context);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`${store.apiURL}/api/salary`)
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    return (
        <div>
            <div>
                <table className="table-bordered">
                    <thead>
                        <tr>
                            <th>Years of Experience</th>
                            <th>Role</th>
                            <th>Category</th>
                            <th>City</th>
                            <th>Country</th>
                            <th>Amount</th>
                            <th>Verified</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.sort((a, b) => a.years_of_experience - b.years_of_experience).map((item, index) => (
                            <tr key={index}>
                                <td>{item.years_of_experience}</td>
                                <td>{item.role}</td>
                                <td>{item.category}</td>
                                <td>{item.city}</td>
                                <td>{item.country}</td>
                                <td>{item.amount}</td>
                                <td>{item.pdf ? <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#ba4ff8', marginLeft: '20px' }} /> : null}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>



            <div>
                <h5>PDF 1</h5>
                <iframe className="myPDF" src="https://res.cloudinary.com/dnwpecmun/image/upload/f_auto,q_auto/v1/salaries/pnfvzprvrifcqelwsmif"></iframe>
            </div>
            <div>
                <h5>PDF 2</h5>
                <iframe className="myPDF" src="https://res.cloudinary.com/dnwpecmun/image/upload/f_auto,q_auto/v1/salaries/pnfvzprvrifcqelwsmif"></iframe>
            </div>
            <div>
                <h5>PDF 3</h5>
                <iframe className="myPDF" src="https://res.cloudinary.com/dnwpecmun/image/upload/f_auto,q_auto/v1/salaries/pnfvzprvrifcqelwsmif"></iframe>
            </div>
        </div>
    );
};

export default AdminView;

