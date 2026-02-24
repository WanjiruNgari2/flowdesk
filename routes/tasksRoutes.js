const express = require ("express");
const router = express.Router();
const taskController = require ("../controllers/tasksControllers");


//TASK ROUTES:
router.get("/", taskController.getAllTasks);
router.get("/overdue", taskController.getOverdueTasks);
router.post("/", taskController.createTask); 
router.patch("/:id", taskController.updateTaskStatus); 
router.delete("/:id", taskController.deleteTasks); 


router.get("/client/:id", taskController.getTasksByClient);


module.exports = router;
