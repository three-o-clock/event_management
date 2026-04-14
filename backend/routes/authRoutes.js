const express = require('express');
const router = express.Router();
const { register, login, googleLogin, getProfile } = require('../controllers/authcontroller.js');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123';

// ─── JWT MIDDLEWARE ───────────────────────────────────────────
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token)
        return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

// ─── ROUTES ──────────────────────────────────────────────────
router.post('/register', register);
router.post('/login', login);
router.post('/google', googleLogin);           // ← Google login
router.get('/profile', verifyToken, getProfile);

module.exports = router;