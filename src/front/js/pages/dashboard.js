import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/dashboard.css";

import { ChartsComponent } from "./chartsComponent";
import MainRoles from './mainroles';

export const Dashboard = () => {
    const [activeComponent, setActiveComponent] = useState('BasicTabs');  // Initial active component

    const handleButtonClick = (componentName) => {
        setActiveComponent(componentName);
    };


    return (
        <div className="text-center">
            <div className="pseudo-navbar dashboardBg">
                <h1 style={{ background: '-webkit-linear-gradient(left, blue, white)', WebkitBackgroundClip: 'text', color: 'transparent', paddingTop: '20px' }}>
                    Unlocking IT salaries, Embracing Transparency in Tech Careers.
                </h1>

                <div className="button-container mt-5">
                    <Link to="#" className="buttonStyle" onClick={() => handleButtonClick('MainRoles')}>Main</Link>
                    <Link to="#" className="buttonStyle" onClick={() => handleButtonClick('ChartsComponent')}>Charts</Link>
                    <Link to="#" className="buttonStyle">Button 3</Link>
                    <Link to="#" className="buttonStyle">Button 4</Link>
                </div>

            </div>

            {activeComponent === 'MainRoles' && <MainRoles />}
            {activeComponent === 'ChartsComponent' && <ChartsComponent />}
            {/* Add more conditions for other components */}

        </div>
    );
};