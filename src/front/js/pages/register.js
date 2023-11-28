import React, { useContext } from 'react';
import { Context } from "../store/appContext";
import { Link, useNavigate } from 'react-router-dom';

export const Register = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context)

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
        actions.handleSubmitRegister(e, navigate);
    };

    return (
        <div className="pseudo-navbar" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 style={{ background: '-webkit-linear-gradient(left, blue, white)', WebkitBackgroundClip: 'text', color: 'transparent', paddingTop: '20px' }}>
                Registration
            </h1>
            <form onSubmit={handleSubmit} className='mx-auto p-3 border-1 w-25' style={{ boxShadow: '0 5px 9px rgba(0, 0, 0, 0.5)', marginTop: '20px' }}>
                <div className="form-group mb-3">
                    <label htmlFor="name" className="form-label" style={{ color: 'white' }}>Name:</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={actions.handleChange} value={store.name} required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="username" className="form-label" style={{ color: 'white' }}>Username:</label>
                    <input type="text" className="form-control" id="username" name="username" onChange={actions.handleChange} value={store.username} required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="email" className="form-label" style={{ color: 'white' }}>Email:</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={actions.handleChange} value={store.email} required />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password" className="form-label" style={{ color: 'white' }}>Password:</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={actions.handleChange} value={store.password} required />
                </div>
                <button type="submit" className='btn btn-primary w-100' style={{ backgroundColor: '#4f89ee' }}>Sign up</button>
            </form>
            <p className='mt-3' style={{ fontSize: '14px', color: 'white' }}>
                Already have an account with us?{' '}
                <Link to="/" style={{ color: '#4f89ee', textDecoration: 'underline' }}>
                    Sign in
                </Link>
            </p>
        </div>
    );
}