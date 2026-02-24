const express = require("express");
const router = express.Router();

const clientRoutes = require("./clientRoutes");
const tasksRoutes = require("./tasksRoutes");

router.use("/clients", clientRoutes);
router.use("/tasks", tasksRoutes);

module.exports = router;