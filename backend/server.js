const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server running");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

const eventRoutes = require("./routes/eventRoutes");
app.use("/", eventRoutes);