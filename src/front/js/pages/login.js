import React, { useContext } from 'react'
import { Context } from '../store/appContext'
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import "../../styles/login.css"

export const Login = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context)
    const { t } = useTranslation();

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
        actions.handleSubmitLogin(e, navigate);
    };

    return (
        <>
            {/* <div>Login {store?.username}</div>
            <p>{store?.result}</p>
            <button className='btn btn-primary' onClick={actions.saludar}>Imprimir username</button> */}

            <form onSubmit={handleSubmit} className='trololo montañes mx-auto my-5 p-3 ' style={{ boxShadow: '0 5px 9px rgba(0, 0, 0, 0.5)' }}>
                <div className="form-group mb-3">
                    <label htmlFor="username" className="form-label" style={{ color: 'white' }}>{t('Username')}:</label>
                    <input type="text" className="form-control" id="username" name="username" onChange={actions.handleChange} value={store.username} autocomplete="off" />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password" className="form-label" style={{ color: 'white' }}>{t('Password')}:</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={actions.handleChange} value={store.password} />
                </div>
                <button className='btn w-100' style={{ backgroundColor: '#4f89ee' }}>{t('Sign in')}</button>
            </form>
            <p className='mt-3' style={{ fontSize: '14px', color: 'white' }}>
                {t('Don\'t have an account yet?')}{' '}
                <Link to="/register" style={{ color: '#4f89ee', textDecoration: 'underline' }}>
                    {t('Sign up')}
                </Link>
            </p>
        </>
    )
}