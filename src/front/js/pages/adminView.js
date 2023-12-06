import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEye, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
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

    const handleVerifyClick = async () => {
        // Update the verification status of the selected item
        const updatedItem = { ...selectedItem, is_verified: true };
        setSelectedItem(updatedItem);

        // Send a request to the API to update the item
        try {
            const response = await fetch(`${store.apiURL}/api/salary/${selectedItem.id}/verify`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedItem),
            });

            if (!response.ok) {
                throw new Error('Failed to verify PDF');
            }

            const updatedData = data.map(item => item.id === selectedItem.id ? updatedItem : item);
            setData(updatedData);
        } catch (error) {
            console.error(error);
        }
    };

    const handleRejectClick = async () => {
        // Aqui agregar logica para rechazar PDF:
        // Enviar correo de rechazo
        // Dejar sin icono de verificacion en la vista del usuario
    }

    return (
        <div>
            <div>
                <table className="table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Years of Experience</th>
                            <th>Role</th>
                            <th>City</th>
                            <th>Country</th>
                            <th>Amount</th>
                            <th>Verified</th>
                            <th>view PDF</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data
                            .filter(item => item.pdf)
                            .sort((a, b) => a.years_of_experience - b.years_of_experience)
                            .map((item, index) => (
                                <tr key={index}>
                                    <td className="id-column">{item.id}</td>
                                    <td>{item.years_of_experience}</td>
                                    <td>{item.role}</td>
                                    <td>{item.city}</td>
                                    <td>{item.country}</td>
                                    <td>{item.amount}</td>
                                    <td>
                                        {item.is_verified
                                            ? <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', marginLeft: '20px' }} />
                                            : <FontAwesomeIcon icon={faTimesCircle} style={{ color: '#F29339', marginLeft: '20px' }} />
                                        }
                                    </td>
                                    <td>{item.pdf ? <FontAwesomeIcon icon={faEye} className="eye-icon" onClick={() => setSelectedItem(item)} /> : null}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>



            <div class="pdf-container">
                <h3>Selected PDF:</h3>
                {selectedItem && <h4 style={{ color: 'white' }}>ID {selectedItem.id}</h4>}
                {selectedItem &&
                    <div className='button-container'>
                        <div className='justify-content-center verify-div'>
                            <button className='verify-button' onClick={handleVerifyClick}>
                                Verify PDF <FontAwesomeIcon icon={faCheckCircle} style={{ marginLeft: '20px' }} />
                            </button>
                        </div>
                        <div className='justify-content-center verify-div'>
                            <button className='verify-button reject-button' onClick={handleRejectClick}>
                                Reject PDF <FontAwesomeIcon icon={faTimesCircle} style={{ marginLeft: '20px' }} />
                            </button>
                        </div>
                    </div>
                }
                {selectedItem ? <iframe class="myPDF" src={selectedItem.pdf_optimized}></iframe> : <p>Please select a PDF from the table by clicking on the <FontAwesomeIcon icon={faEye} /> icon.</p>}
            </div>
        </div>
    );
};

export default AdminView;

