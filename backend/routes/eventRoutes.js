const express = require("express");
const router = express.Router();

router.get("/events", (req, res) => {
    res.json([
        { event_name: "Hackathon" },
        { event_name: "Tech Fest" }
    ]);
});

module.exports = router;