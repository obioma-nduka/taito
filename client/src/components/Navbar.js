import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav style={{ padding: '1rem', background: '#eee', marginBottom: '1rem' }}>
            <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
            {!user ? (
                <>
                    <Link to="/login" style={{ marginRight: '1rem' }}>Login</Link>
                    <Link to="/register">Register</Link>
                </>
            ) : (
                <>
                    {user.role === 'customer' && (
                        <Link to="/dashboard" style={{ marginRight: '1rem' }}>Dashboard</Link>
                    )}
                    {user.role === 'freelancer' && (
                        <Link to="/freelancer-dashboard" style={{ marginRight: '1rem' }}>Freelancer</Link>
                    )}
                    <button onClick={handleLogout} style={{ marginLeft: '1rem' }}>Logout</button>
                </>
            )}
        </nav>
    );
};

export default NavBar;
