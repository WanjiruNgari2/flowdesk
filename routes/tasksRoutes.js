const express = require("express");
const router = express.Router();
const taskController = require("../controllers/tasksControllers");

// Task Routes
router.get("/", taskController.getAllTasks);
router.get("/overdue", taskController.getOverdueTasks);
router.post("/", taskController.createTasks);
router.patch("/:id/status", taskController.updateTaskStatus);
router.delete("/:id", taskController.deleteTasks);
router.get("/client/:id", taskController.getTasksByClient);

module.exports = router;