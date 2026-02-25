const express = require("express");
const path = require("path");
const routes = require("./routes");
const app = express();

// Middleware
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use("/api", routes);

// For Vercel serverless
module.exports = app;

// Only listen locally
if (process.env.NODE_ENV !== 'production') {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}