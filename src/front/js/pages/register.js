import React, { useContext, useState } from 'react';
import { Context } from "../store/appContext";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export const Register = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context)
    const [confirmPassword, setConfirmPassword] = useState('');
    const { t } = useTranslation();

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents the default form submission behavior

        if (store.password !== confirmPassword) {
            toast("Passwords do not match", { type: "error", theme: "dark" });
            return;
        }

        actions.handleSubmitRegister(e, navigate);
    };

    return (
        <div className="pseudo-navbar-register" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ background: '-webkit-linear-gradient(left, blue, white)', WebkitBackgroundClip: 'text', color: 'transparent', paddingTop: '20px' }}>
                {t('Registration')}
            </h1>
            <form onSubmit={handleSubmit} className='mx-auto p-3 border-1 w-25' style={{ boxShadow: '0 5px 9px rgba(0, 0, 0, 0.5)', marginTop: '20px' }}>
                <div className="form-group mb-3">
                    <label htmlFor="name" className="form-label" style={{ color: 'white' }}>{t('Name')}:</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={actions.handleChange} value={store.name} required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="username" className="form-label" style={{ color: 'white' }}>{t('Username')}:</label>
                    <input type="text" className="form-control" id="username" name="username" onChange={actions.handleChange} value={store.username} required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="email" className="form-label" style={{ color: 'white' }}>{t('Email')}:</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={actions.handleChange} value={store.email} required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password" className="form-label" style={{ color: 'white' }}>{t('Password')}:</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={actions.handleChange} value={store.password} required />
                </div>




                <div className="form-group mb-3">
                    <label htmlFor="confirmPassword" className="form-label" style={{ color: 'white' }}>{t('Confirm Password')}:</label>
                    <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} required />
                </div>




                <button type="submit" className='btn btn-primary w-100' style={{ backgroundColor: '#4f89ee' }}>{t('Sign up')}</button>
            </form>
            <p className='mt-3' style={{ fontSize: '14px', color: 'white' }}>
                {t('Already have an account with us?')}{' '}
                <Link to="/" style={{ color: '#4f89ee', textDecoration: 'underline' }}>
                    {t('Sign in')}
                </Link>
            </p>
        </div>
    );
}