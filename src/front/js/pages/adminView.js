import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEye } from '@fortawesome/free-solid-svg-icons';
import "../../styles/admin.css";


const AdminView = () => {
    const { store } = useContext(Context);
    const [data, setData] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isPdfVerified, setPdfVerified] = useState(false);

    useEffect(() => {
        fetch(`${store.apiURL}/api/salary`)
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    const handleVerifyClick = () => {
        // Update the verification status of the selected item
        const updatedItem = { ...selectedItem, isVerified: true };
        setSelectedItem(updatedItem);

        // Update the data array
        const updatedData = data.map(item => item === selectedItem ? updatedItem : item);
        setData(updatedData);
    };

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
                            <th>PDF view</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data
                            .filter(item => item.pdf)
                            .sort((a, b) => a.years_of_experience - b.years_of_experience)
                            .map((item, index) => (
                                <tr key={index}>
                                    <td>{item.years_of_experience}</td>
                                    <td>{item.role}</td>
                                    <td>{item.category}</td>
                                    <td>{item.city}</td>
                                    <td>{item.country}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.isVerified ? <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#ba4ff8', marginLeft: '20px' }} /> : null}</td>
                                    <td>{item.pdf ? <FontAwesomeIcon icon={faEye} style={{ color: '#ba4ff8', marginLeft: '20px' }} onClick={() => setSelectedItem(item)} /> : null}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>



            <div class="pdf-container">
                <h3>Selected PDF:</h3>
                {selectedItem && <div className='justify-content-center verify-div'><button className='verify-button' onClick={handleVerifyClick}>Verify PDF <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#ba4ff8', marginLeft: '20px' }} /></button></div>}
                {selectedItem ? <iframe class="myPDF" src={selectedItem.pdf_optimized}></iframe> : <p>Please select a PDF from the table by clicking on the <FontAwesomeIcon icon={faEye} /> icon.</p>}
            </div>
        </div>
    );
};

export default AdminView;

