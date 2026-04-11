const express = require("express");
const cors = require("cors");
require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("Server running");
});

// Events route
const eventRoutes = require("./routes/eventRoutes");
app.use("/", eventRoutes);

// Register route
const registerRoute = require("./routes/register");
app.use("/register", registerRoute);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
