// const express = require("express");
// const router = express.Router();

// const clientRoutes = require("./clientRoutes");
// const tasksRoutes = require("./tasksRoutes");

// router.use("/clients", clientRoutes);
// router.use("/tasks", tasksRoutes);

// module.exports = router;



const express = require("express");
const router = express.Router();

console.log('Loading clientRoutes from:', require.resolve("./clientRoutes"));
console.log('Loading tasksRoutes from:', require.resolve("./tasksRoutes"));

const clientRoutes = require("./clientRoutes");
const tasksRoutes = require("./tasksRoutes");

console.log('clientRoutes type:', typeof clientRoutes);
console.log('tasksRoutes type:', typeof tasksRoutes);

router.use("/clients", clientRoutes);
router.use("/tasks", tasksRoutes);

module.exports = router;