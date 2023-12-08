import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';
import openTechIcon from "../../img/light-logo.png";
import { useTranslation } from 'react-i18next';

export const Welcome = () => {
    const { store, actions } = useContext(Context)
    const { t } = useTranslation();

    return (
        <div>
            <h2 style={{ color: '#ccc', marginTop: '30px', fontSize: '50px' }}>{t('Welcome')}, {store?.user && (
                <span className="username" style={{ color: '#ccc', marginLeft: '5px' }}>{store.user.username}</span>
            )}!</h2>

            <div className="button-container" style={{ marginTop: '45px' }}>
                <Link to="/dashboard" className="buttonStyle" style={{ padding: '30px', fontSize: '30px', borderRadius: '20px', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={openTechIcon} alt="open Tech Logo" style={{ marginBottom: '10px', width: '70px' }} />
                    {t('Go to Salaries')}
                </Link>
            </div>
        </div>
    );
}

