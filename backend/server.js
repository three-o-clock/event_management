const express = require("express");
const cors = require("cors");
require("./db");


const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server running");
});

const eventRoutes = require("./routes/eventRoutes");
app.use("/", eventRoutes);

const registerRoute = require("./routes/register");
app.use("/register", registerRoute);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

