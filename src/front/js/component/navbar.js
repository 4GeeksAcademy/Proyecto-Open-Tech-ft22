import React from "react";
import { Link } from "react-router-dom";
import LanguageSelector from "./languajeSelector";
import "../../styles/navbar.css";
import openTechLogo from "../../img/navbar-brand-img.png";
import Logout from "../pages/logout";
import { useTranslation } from "react-i18next";


export const Navbar = () => {
	const { t } = useTranslation();

	return (
        <nav className="navbar" style={{ backgroundColor: 'black', height: '90px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', borderBottom: '1px solid #ccc' }}>
            <div className="container navbar-content">
                <Link to="/">
                    <span className="navbar-brand mb-0 openTech-Logo logo"><img src={openTechLogo} style={{ width: '160px' }} /></span>
                </Link>
                <div className="ml-auto d-flex justify-content-between" style={{ alignItems: 'center' }}>
                    <LanguageSelector />
                    <Link to="/dashboard/formManual">
                        <button className="btn submitSalaryNav me-4" style={{ backgroundColor: '#4f89ee' }}>{t('Submit Salary')}</button>
                    </Link>
                    <Logout />
                </div>
            </div>
        </nav>
    );
};
