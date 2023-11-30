import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/dashboard.css";
import openTechIcon from "../../img/dark-logo.png";

import { ChartsComponent } from "./chars/chartsComponent";
import MainRoles from './mainroles';
import { NeutralView } from './neutralView';


export const Dashboard = () => {
    const [activeComponent, setActiveComponent] = useState('MainRoles');  // Initial active component

    const handleButtonClick = (componentName) => {
        setActiveComponent(componentName);
    };


    return (
        <div className="text-center">
            <div className="pseudo-navbar dashboardBg">
                <h1 style={{ background: '-webkit-linear-gradient(left, blue, white)', WebkitBackgroundClip: 'text', color: 'transparent', paddingTop: '20px' }}>
                    Unlocking IT salaries, Embracing Transparency in Tech Careers.
                </h1>

                <div className="button-container mt-2">
                    <Link to="#" className="buttonStyle" onClick={() => handleButtonClick('MainRoles')}>Main</Link>
                    <Link to="#" className="buttonStyle" onClick={() => handleButtonClick('ChartsComponent')}>Charts</Link>
                </div>
                <div className="button-container" style={{ marginTop: '15px' }}>
                    <Link to="/" className="buttonStyle" style={{ padding: '20px', fontSize: '25px', borderRadius: '20px', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={openTechIcon} alt="open Tech Logo" style={{ marginBottom: '5px', width: '65px' }} />
                        Go back home
                    </Link>
                </div>

            </div>

            {activeComponent === 'MainRoles' && <MainRoles />}
            {activeComponent === 'ChartsComponent' && <ChartsComponent />}
            {/* Add more conditions for other components */}

        </div>
    );
};