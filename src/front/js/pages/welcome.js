import React, { useContext } from 'react';
import { Context } from '../store/appContext';

export const Welcome = () => {
    const { store, actions } = useContext(Context)
    return (
        <div>
            <h2 style={{ color: '#ccc', marginTop: '30px', fontSize: '50px' }}>Welcome, {store?.user && (
                <span className="username" style={{ color: '#ccc', marginLeft: '5px' }}>{store.user.username}</span>
            )}!</h2>
        </div>
    );
}

