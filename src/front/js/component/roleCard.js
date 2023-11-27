import React from 'react';

const RoleCard = ({ roleName, average, entries }) => {
    return (
        <div className="card salaryCard" style={{ height: '140px' }}>
            <div className="card-body">
                <h5 className="card-title" style={{ fontSize: '18px' }}>{roleName}</h5>
                <p className="card-subtitle mb-2 text-body-secondary" style={{ fontSize: '17px' }}>Average: ${average}M</p>
                <p className="card-subtitle mb-2 text-body-secondary" style={{ fontSize: '15px' }}>Entries: {entries}</p>
            </div>
        </div>
    )
};

export default RoleCard;