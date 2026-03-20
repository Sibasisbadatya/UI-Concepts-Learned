import React from 'react'
import { Navigate } from 'react-router';
import { useAuth } from '../AuthProvider';

const ProtectedRoute = ({ children }) => {
    const { isLogin } = useAuth();


    if (!isLogin) {
        return <Navigate to={"/login"} replace />
    }
    return children
}

export default ProtectedRoute