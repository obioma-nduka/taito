import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const CustomerDashboard = () => {
    const { user } = useContext(AuthContext);
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
            <h2>Customer Dashboard</h2>
            <p>Welcome, {user.username}!</p> {/* Display username */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search gigs..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <h3>Available Gigs</h3>
            {loading ? (
                <p>Loading gigs...</p>
            ) : error ? (
                <p className="message error">{error}</p>
            ) : filteredGigs && Array.isArray(filteredGigs) && filteredGigs.length > 0 ? (
                <div className="gig-list">
                    {filteredGigs.map(gig => (
                        gig && gig.id ? (
                            <div key={gig.id} className="gig-card">
                                <h4>{gig.title || 'No title'}</h4>
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
        </div>
    );
};

export default CustomerDashboard;