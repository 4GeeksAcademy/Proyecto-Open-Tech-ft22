import React from 'react';

const RoleCard = ({ roleName, average, entries }) => {
    return (
        <div className="card salaryCard">
            <div className="card-body">
                <h5 className="card-title">{roleName}</h5>
                <p className="card-subtitle mb-2 text-body-secondary">Average: ${average}M</p>
                <p className="card-subtitle mb-2 text-body-secondary">Entries: {entries}</p>
            </div>
        </div>
    )
};

export default RoleCard;