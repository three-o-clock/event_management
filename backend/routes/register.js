const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
    console.log("🔥 REGISTER HIT");
    console.log(req.body);

    const {
        eventId,
        name,
        email,
        teamName,
        teamSize,
        leaderName,
        leaderEmail
    } = req.body;

    const query = `
        INSERT INTO registrations 
        (event_id, name, email, team_name, team_size, leader_name, leader_email)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [
        eventId,
        name || null,
        email || null,
        teamName || null,
        teamSize || null,
        leaderName || null,
        leaderEmail || null
    ], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("DB error");
        }

        res.send("Registered successfully");
    });
});

module.exports = router;