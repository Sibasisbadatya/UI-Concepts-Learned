import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const Login = () => setIsLogin(true);
    const Logout = () => setIsLogin(false);
    return (
        <>
            <AuthContext.Provider value={{ isLogin, Login, Logout }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

export const useAuth = () => useContext(AuthContext);