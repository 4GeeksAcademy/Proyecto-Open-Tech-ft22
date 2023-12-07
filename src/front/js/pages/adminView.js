import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEye, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal } from 'react-bootstrap';
import "../../styles/admin.css";
import { Link } from 'react-router-dom';


const AdminView = () => {
    const { store } = useContext(Context);
    const [data, setData] = useState([]);
    const [historyData, setHistoryData] = useState([]); // Aqui se guarda el historial de verificaciones [PDFs verificados]
    const [selectedItem, setSelectedItem] = useState(null);
    const [isPdfVerified, setPdfVerified] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    //Pagination:
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;



    const fetchData = async () => {
        const response = await fetch(`${store.apiURL}/api/salary`);
        const data = await response.json();
        console.log(data);  // Log the data to the console
        setData(data);

        const historyResponse = await fetch(`${store.apiURL}/api/history`);
        const historyData = await historyResponse.json();
        setHistoryData(historyData);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleVerifyClick = async () => {
        await fetchData();
        // Update the verification status of the selected item
        setShowModal(true);
    };

    const handleRejectClick = async () => {
        await fetchData();
        setShowRejectModal(true);
    };

    const handleVerify = async () => {
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
            setShowModal(false);
            setData(updatedData);
            setSelectedItem(null);

            // Re-fetch the data
            await fetchData();
        } catch (error) {
            console.error(error);
        }
    }

    const handleReject = async () => {
        // Aqui agregar logica para rechazar PDF:
        // Enviar correo de rechazo
        // Dejar sin icono de verificacion en la vista del usuario
        const updatedItem = { ...selectedItem, is_verified: false };
        setSelectedItem(updatedItem);

        // Send a request to the API to update the item
        try {
            const response = await fetch(`${store.apiURL}/api/salary/${selectedItem.id}/reject`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedItem),
            });

            if (!response.ok) {
                throw new Error('Failed to reject PDF');
            }

            const updatedData = data.map(item => item.id === selectedItem.id ? updatedItem : item);
            setShowRejectModal(false);
            setData(updatedData);
            setSelectedItem(null);

            // Re-fetch the data
            await fetchData();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <div className="text-center">
                <Link to='/dashboard' className='backButton'>Go back to the main page</Link>
            </div>
            <div>
                <h4 style={{ marginLeft: '80px', color: 'white', marginTop: '30px' }}>Pending:</h4>
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
                            .filter(item => item.pdf && !item.is_in_history)
                            .sort((a, b) => a.id - b.id)
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



            <div className="pdf-container">
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
                {selectedItem ? <iframe className="myPDF" src={selectedItem.pdf_optimized}></iframe> : <p>Please select a PDF from the table by clicking on the <FontAwesomeIcon icon={faEye} /> icon.</p>}
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>PDF verification</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to verify this PDF?</p>
                    <p>A verification email will be sent to the user.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleVerify}>
                        Verify
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>PDF rejection</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to reject this PDF?</p>
                    <p>A rejection email will be sent to the user.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowRejectModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleReject}>
                        Reject
                    </Button>
                </Modal.Footer>
            </Modal>










            <div>
                <h4 style={{ marginLeft: '80px', color: 'white' }}>History:</h4>
                <table className="table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Years of Experience</th>
                            <th>Role</th>
                            <th>City</th>
                            <th>Country</th>
                            <th>Amount</th>
                            <th>Updated at</th>
                            <th>Verified</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historyData && historyData
                            .sort((a, b) => a.salary_id - b.salary_id)
                            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                            .map((item, index) => (
                                <tr key={index}>
                                    <td className="id-column">{item.salary_id}</td>
                                    <td>{item.years_of_experience}</td>
                                    <td>{item.role}</td>
                                    <td>{item.city}</td>
                                    <td>{item.country}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.updated_at}</td>
                                    <td>
                                        {item.is_verified
                                            ? <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green', marginLeft: '20px' }} />
                                            : <FontAwesomeIcon icon={faTimesCircle} style={{ color: '#F29339', marginLeft: '20px' }} />
                                        }
                                    </td>

                                </tr>
                            ))}
                    </tbody>
                </table>
                <div className='previous-next'>
                    <button className='pagination' onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}><div className="button-content">
                        <i className="fa-solid fa-angles-left"></i>
                        <span>Previous</span>
                    </div></button>
                    <button className='pagination' onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(data.length / itemsPerPage)}><div className="button-content">
                        <span>Next</span>
                        <i className="fa-solid fa-angles-right"></i>
                    </div></button>
                </div>
            </div>





        </div>
    );
};

export default AdminView;
