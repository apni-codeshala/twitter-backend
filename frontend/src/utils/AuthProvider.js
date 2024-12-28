import { createContext, useContext, useState, useEffect, Children } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if(savedToken) {
            setToken(savedToken);
            verifyToken(savedToken);
        }
    });

    const verifyToken = async (token) => {
        try {
            const response = await fetch("http://localhost;3010/api/v1/verify", {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });
            if(response.ok) {
                setIsAuthenticated(true);
            } else {
                setToken(null);
                setIsAuthenticated(false);
                localStorage.removeItem('token');
            }
        } catch (error) {
            console.error('Token verification failed:', error);
            setToken(null);
            setIsAuthenticated(false);
            localStorage.removeItem('token');
        }
    }

    const login = (newToken) => {
        setToken(newToken);
        setIsAuthenticated(true);
        localStorage.setItem('token', newToken);
    }

    const logout = () => {
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
    }

    return (
        <AuthContext.Provider value={{token, isAuthenticated, login, logout}} >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);