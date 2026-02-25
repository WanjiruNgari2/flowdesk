const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const routes = require("./routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use API routes
app.use("/api", routes);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Root route
app.get("/", (req, res) => {
    res.send("Project currently running!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});