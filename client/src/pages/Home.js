import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Home = () => {
    const { user } = useContext(AuthContext); // Access user from AuthContext
    const [gigs, setGigs] = useState([]);
    const [filteredGigs, setFilteredGigs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGigs = async () => {
            try {
                setLoading(true);
                const res = await axios.get('http://localhost:5000/api/gigs');
                setGigs(res.data || []);
                setFilteredGigs(res.data || []);
            } catch (err) {
                setError('Failed to load gigs');
                setGigs([]);
                setFilteredGigs([]);
            } finally {
                setLoading(false);
            }
        };
        fetchGigs();
    }, []);

    useEffect(() => {
        setFilteredGigs(
            gigs && Array.isArray(gigs)
                ? gigs.filter(gig =>
                      gig && gig.title && gig.description
                          ? (gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             gig.description.toLowerCase().includes(searchTerm.toLowerCase()))
                          : false
                  )
                : []
        );
    }, [searchTerm, gigs]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="container">
            <h1>Welcome to Taito</h1>
            {user && user.role === 'customer' ? (
                <>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search gigs..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                    <h2>Available Gigs</h2>
                    {loading ? (
                        <p>Loading gigs...</p>
                    ) : error ? (
                        <p className="message error">{error}</p>
                    ) : filteredGigs && Array.isArray(filteredGigs) && filteredGigs.length > 0 ? (
                        <div className="gig-list">
                            {filteredGigs.map(gig => (
                                gig && gig.id ? (
                                    <div key={gig.id} className="gig-card">
                                        <h3>{gig.title || 'No title'}</h3>
                                        <p>{gig.description || 'No description'}</p>
                                        <p><strong>Price:</strong> ${gig.price || 'N/A'}</p>
                                        <p><strong>Freelancer:</strong> {gig.username || 'Unknown'}</p>
                                    </div>
                                ) : null
                            ))}
                        </div>
                    ) : (
                        <p>No gigs available.</p>
                    )}
                </>
            ) : (
                <div>
                    <p>Please log in as a customer to view available gigs.</p>
                    <p>
                        <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to get started.
                    </p>
                </div>
            )}
        </div>
    );
};

export default Home;