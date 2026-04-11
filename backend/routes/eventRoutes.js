const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all events
router.get("/events", (req, res) => {
    db.query("SELECT * FROM events", (err, result) => {
        if (err) {
            console.error("DB ERROR:", err);
            return res.status(500).json({ error: "Database error" }); // IMPORTANT
        }

        res.json(result);
    });
});

module.exports = router;