import React from 'react';
import { Link } from 'react-router-dom';

const RoleCard = ({ roleName, average, entries }) => {


    return (
        <Link to={`/dashboard/spectPages/${roleName}`} style={{ textDecoration: 'none' }}>
            <div className="card salaryCard" style={{ height: '142px' }}>
                <div className="card-body">
                    <h6 className="card-title" style={{ fontSize: '16px', height: '50px', color: '#B4B4B4' }}>{roleName}</h6>
                    <p className="card-subtitle mb-2 text-body-secondary" style={{ fontSize: '15px', color: '#4f89ee' }}>Average: $ {average} USD </p>
                    <p className="card-subtitle mb-2 text-body-secondary" style={{ fontSize: '15px', color: '#ba4ff8' }}>Entries: {entries}</p>
                </div>
            </div>
        </Link>
    )
};

export default RoleCard;