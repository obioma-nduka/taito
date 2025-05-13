const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticate = require('../middleware/authenticate');

// Create a gig (freelancer only)
router.post('/create', authenticate, async (req, res) => {
    if (req.user.role !== 'freelancer') {
        return res.status(403).json({ message: 'Access denied' });
    }
    const { title, description, price } = req.body;
    try {
        await db.promise().query(
            'INSERT INTO gigs (title, description, price, freelancer_id) VALUES (?, ?, ?, ?)',
            [title, description, price, req.user.id]
        );
        res.status(201).json({ message: 'Gig created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all gigs
router.get('/', async (req, res) => {
    try {
        const [gigs] = await db.promise().query(`
            SELECT gigs.*, users.username 
            FROM gigs 
            JOIN users ON gigs.freelancer_id = users.id
        `);
        res.json(gigs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;