import React, { useContext } from 'react'
import { Context } from '../store/appContext'
import { Link } from 'react-router-dom';

export const Login = () => {
    const { store, actions } = useContext(Context)
    return (
        <>
            {/* <div>Login {store?.username}</div>
            <p>{store?.result}</p>
            <button className='btn btn-primary' onClick={actions.saludar}>Imprimir username</button> */}

            <form onSubmit={actions.handleSubmitLogin} className='mx-auto my-5 p-3 w-25' style={{ boxShadow: '0 5px 9px rgba(0, 0, 0, 0.5)' }}>
                <div className="form-group mb-3">
                    <label htmlFor="username" className="form-label" style={{ color: 'white' }}>Username:</label>
                    <input type="text" className="form-control" id="username" name="username" onChange={actions.handleChange} value={store.username} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password" className="form-label" style={{ color: 'white' }}>Password:</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={actions.handleChange} value={store.password} />
                </div>
                <button className='btn w-100' style={{ backgroundColor: '#4f89ee' }}>Sign in</button>
            </form>
            <p className='mt-3' style={{ fontSize: '14px', color: 'white' }}>
                Don't have an account yet?{' '}
                <Link to="/register" style={{ color: '#4f89ee', textDecoration: 'underline' }}>
                    Sign up
                </Link>
            </p>
        </>
    )
}