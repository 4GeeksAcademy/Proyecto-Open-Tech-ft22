import React, { useContext } from 'react';
import { Context } from "../store/appContext";

const AdminInit = () => {
    const { store, actions } = useContext(Context);

    const handleClick = () => {
        actions.postCategory();
    };

    return (
        <div>
            <button onClick={handleClick}>Post Category</button>
        </div>
    );
};

export default AdminInit;

