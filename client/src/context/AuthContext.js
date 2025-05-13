import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const username = localStorage.getItem('username'); // Add username
        if (token && role && username) {
            setUser({ token, role, username });
        }
    }, []);

    const login = (token, role, username) => { // Add username parameter
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('username', username); // Store username
        setUser({ token, role, username });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('username'); // Remove username
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};