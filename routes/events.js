const express = require('express');
const router = express.Router();
const db = require('../database/event_db');

// 获取所有活动（简化版）
router.get('/', (req, res) => {
    const query = `
        SELECT e.*, n.ngo_name, n.contact_email 
        FROM event e 
        JOIN ngo n ON e.ngo_id = n.ngo_id 
        WHERE e.status = 'active' 
        ORDER BY e.start_date ASC
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ 
                error: 'Failed to fetch events',
                details: err.message 
            });
        }
        res.json(results);
    });
});

// 搜索活动
router.get('/search', (req, res) => {
    const { location, date } = req.query;
    let query = `
        SELECT e.*, n.ngo_name 
        FROM event e 
        JOIN ngo n ON e.ngo_id = n.ngo_id 
        WHERE e.status = 'active'
    `;
    const params = [];

    if (location) {
        query += ' AND e.location LIKE ?';
        params.push(`%${location}%`);
    }
    if (date) {
        query += ' AND DATE(e.start_date) = ?';
        params.push(date);
    }

    query += ' ORDER BY e.start_date ASC';

    db.query(query, params, (err, results) => {
        if (err) {
            console.error('Search error:', err);
            return res.status(500).json({ error: 'Search failed' });
        }
        res.json(results);
    });
});

// 获取活动详情
router.get('/:id', (req, res) => {
    const eventId = req.params.id;
    
    if (!eventId || isNaN(eventId)) {
        return res.status(400).json({ error: 'Invalid event ID' });
    }

    const query = `
        SELECT e.*, n.ngo_name, n.contact_email, n.hq_location 
        FROM event e 
        JOIN ngo n ON e.ngo_id = n.ngo_id 
        WHERE e.event_id = ?
    `;
    
    db.query(query, [parseInt(eventId)], (err, results) => {
        if (err) {
            console.error('Event details error:', err);
            return res.status(500).json({ error: 'Failed to fetch event details' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json(results[0]);
    });
});

module.exports = router;