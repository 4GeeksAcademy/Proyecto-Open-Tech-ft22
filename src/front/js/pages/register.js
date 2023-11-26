import React, { useContext } from 'react';
import { Context } from "../store/appContext";

export const Register = () => {
    const { store, actions } = useContext(Context)
    return (
        <>
            {/* <div>Register {store?.username}</div>
            <p>{store?.result}</p>
            <button className='btn btn-primary' onClick={actions.saludar}>Imprimir username</button> */}

            <form onSubmit={actions.handleSubmitRegister} className='mx-auto my-5 p-3 border-1 shadow w-25'>
                <div className="form-group mb-3">
                    <label htmlFor="username" className="form-label">Username:</label>
                    <input type="email" className="form-control" id="username" name="username" onChange={actions.handleChange} value={store.username} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={actions.handleChange} value={store.password} />
                </div>
                <button className='btn btn-primary w-100'>Register</button>
            </form>
        </>
    )
}