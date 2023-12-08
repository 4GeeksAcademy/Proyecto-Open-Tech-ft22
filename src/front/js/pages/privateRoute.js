import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = ({ currentUser, redirectPath, message, children }) => {
    if (!currentUser) {
        // Show the message if one was provided
        if (message) {
            alert(message);
        }

        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
};