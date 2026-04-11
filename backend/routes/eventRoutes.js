console.log("eventRoutes loaded");

const express = require("express");
const router = express.Router();
const db = require("../db");


// ✅ LOGIN ROUTE (PUT THIS FIRST FOR TESTING)
router.post("/login", (req, res) => {
    console.log("🔥 LOGIN HIT");
    console.log("BODY:", req.body);

    const { email, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE email = ? AND password = ?",
        [email, password],
        (err, result) => {
            console.log("DB RESULT:", result);

            if (err) {
                console.log("ERROR:", err);
                return res.status(500).send("Error logging in");
            }

            if (result.length === 0) {
                return res.status(401).send("Invalid email or password");
            }

            res.json({
                user_id: result[0].user_id
            });
        }
    );
});


// ✅ TEST ROUTE (VERY IMPORTANT)
router.get("/test", (req, res) => {
    res.send("API WORKING");
});

module.exports = router;