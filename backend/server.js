const express = require("express");
const cors = require("cors");

const app = express();

// ✅ IMPORT ROUTES FIRST
const eventRoutes = require("./routes/eventRoutes");

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json());

// ✅ USE ROUTES AFTER IMPORT
app.use("/api", eventRoutes);

// ✅ START SERVER
app.listen(3000, () => {
    console.log("Server running on port 3000");
});