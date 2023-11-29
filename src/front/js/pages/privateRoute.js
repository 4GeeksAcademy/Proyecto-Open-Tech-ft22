import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = ({ currentUser, redirectPath, children }) => {
    if (!currentUser) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
};