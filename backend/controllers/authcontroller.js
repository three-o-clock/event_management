const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// ─── REGISTER ───────────────────────────────────────────────
const register = async (req, res) => {
    const { name, email, phone, department, year, role, password } = req.body;

    if (!name || !email || !password)
        return res.status(400).json({ message: 'Name, email and password are required' });

    try {
        const [existing] = await db.promise().query(
            'SELECT * FROM USER WHERE email = ?', [email]
        );
        if (existing.length > 0)
            return res.status(409).json({ message: 'Email already registered' });

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.promise().query(
            'INSERT INTO USER (name, email, phone, department, year, role, password) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, email, phone, department, year, role, hashedPassword]
        );

        res.status(201).json({ message: 'Registered successfully! Please login.' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// ─── LOGIN ───────────────────────────────────────────────────
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ message: 'Email and password are required' });

    try {
        const [users] = await db.promise().query(
            'SELECT * FROM USER WHERE email = ?', [email]
        );

        if (users.length === 0)
            return res.status(401).json({ message: 'Invalid email or password' });

        const user = users[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ message: 'Invalid email or password' });

        const token = jwt.sign(
            { user_id: user.user_id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                user_id: user.user_id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                department: user.department,
                year: user.year,
                role: user.role
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// ─── GOOGLE LOGIN ─────────────────────────────────────────────
const googleLogin = async (req, res) => {
    const { credential } = req.body;

    if (!credential)
        return res.status(400).json({ message: 'No Google credential provided' });

    try {
        // Verify the Google token
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        const { email, name, sub: google_id } = payload;

        // Check if user already exists
        const [users] = await db.promise().query(
            'SELECT * FROM USER WHERE email = ?', [email]
        );

        let user;

        if (users.length === 0) {
            // New user — auto register them
            const [result] = await db.promise().query(
                'INSERT INTO USER (name, email, role) VALUES (?, ?, ?)',
                [name, email, 'student']
            );
            const [newUser] = await db.promise().query(
                'SELECT * FROM USER WHERE user_id = ?', [result.insertId]
            );
            user = newUser[0];
        } else {
            user = users[0];
        }

        // Create JWT
        const token = jwt.sign(
            { user_id: user.user_id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Google login successful',
            token,
            user: {
                user_id: user.user_id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                department: user.department,
                year: user.year,
                role: user.role
            }
        });

    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Invalid Google token' });
    }
};

// ─── GET PROFILE ──────────────────────────────────────────────
const getProfile = async (req, res) => {
    try {
        const [users] = await db.promise().query(
            'SELECT user_id, name, email, phone, department, year, role FROM USER WHERE user_id = ?',
            [req.user.user_id]
        );

        if (users.length === 0)
            return res.status(404).json({ message: 'User not found' });

        res.json(users[0]);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { register, login, googleLogin, getProfile };