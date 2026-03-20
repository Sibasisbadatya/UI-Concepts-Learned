import React from 'react'
import { useAuth } from '../AuthProvider'
import { useNavigate } from 'react-router';
import './Login.css'
const Login = () => {
    const { Login } = useAuth();
    const navigate = useNavigate();
    const handleLogin = () => {
        Login();
        navigate('/dashboard')
    }
    return (
        <>
           <h2 className='loginTag'>Login Page</h2>

            <button onClick={handleLogin}>Login</button>
        </>
    )
}

export default Login