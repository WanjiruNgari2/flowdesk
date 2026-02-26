const express = require("express");
const path = require("path");
const cors = require("cors");
const routes = require("./routes");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Disable caching globally for all responses
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  next();
});

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