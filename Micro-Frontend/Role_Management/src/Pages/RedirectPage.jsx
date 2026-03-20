import React from 'react'
import { Navigate } from 'react-router'
const RedirectPage = () => {
    return (
        <Navigate to="/" replace />
    )
}
export default RedirectPage;