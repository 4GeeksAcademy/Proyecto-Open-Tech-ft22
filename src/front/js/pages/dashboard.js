import React from 'react';
import { Link } from 'react-router-dom';
import "../../styles/dashboard.css";

export const Dashboard = () => {
    return (
        <div className="text-center">
            <div className="pseudo-navbar dashboardBg">
                <h1 style={{ background: '-webkit-linear-gradient(left, blue, white)', WebkitBackgroundClip: 'text', color: 'transparent', paddingTop: '20px' }}>
                    Unlocking IT salaries, Embracing Transparency in Tech Careers.
                </h1>

                <div className="button-container mt-5">
                    <Link to="#" className="buttonStyle">Button 1</Link>
                    <Link to="#" className="buttonStyle">Button 2</Link>
                    <Link to="#" className="buttonStyle">Button 3</Link>
                    <Link to="#" className="buttonStyle">Button 4</Link>
                </div>

            </div>
        </div>
    );
};