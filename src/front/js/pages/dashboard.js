import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/dashboard.css";
import { Context } from "../store/appContext";

import { ChartsComponent } from "./chars/chartsComponent";
import MainRoles from './mainroles';
import { NeutralView } from './neutralView';
import { useTranslation } from 'react-i18next';


export const Dashboard = () => {
    const { store, actions } = useContext(Context);
    const { role } = store;
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="text-center">
            <div className="pseudo-navbar dashboardBg">
                <h1 style={{ background: '-webkit-linear-gradient(left, blue, white)', WebkitBackgroundClip: 'text', color: 'transparent', paddingTop: '20px' }}>
                    {t('Unlocking IT salaries, Embracing Transparency in Tech Careers.')}
                </h1>
                <div className="button-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
                    <Link to="/" className="buttonStyle" style={{ padding: '20px', fontSize: '25px', borderRadius: '20px', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginRight: '20px' }}>
                        <i className="fa-solid fa-house" alt="Home Icon" style={{ marginBottom: '15px', width: '65px', color: '#853BB0', fontSize: '40px' }}></i>
                        {t('Go back home')}
                    </Link>
                    {role === 'ADMIN' && (
                        <Link to="/dashboard/admin" className="buttonStyle" style={{ padding: '20px', fontSize: '25px', borderRadius: '20px', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <i className="fa-solid fa-lock" alt="Admin Icon" style={{ marginBottom: '15px', width: '65px', color: '#853BB0', fontSize: '40px' }}></i>
                            {t('Admin Button')}
                        </Link>
                    )}
                </div>
            </div>

            <MainRoles />
        </div>
    );
};