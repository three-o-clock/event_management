require('dotenv').config();  // ← ADD THIS AS LINE 1

const express = require("express");
const cors = require("cors");

const app = express();

// ✅ IMPORT ROUTES FIRST
const eventRoutes = require("./routes/eventRoutes");
const authRoutes = require("./routes/authRoutes");

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json());

// ✅ USE ROUTES AFTER IMPORT
app.use("/api", eventRoutes);
app.use("/api/auth", authRoutes);

// ✅ START SERVER
app.listen(3000, () => {
    console.log("Server running on port 3000");
});