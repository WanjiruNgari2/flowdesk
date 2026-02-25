const express = require ("express");
const router = express.Router();
const clientController = require("../controllers/clientControllers");


// client Routes 
router.get("/", clientController.getAllClients); 
// router.get("/:id", clientController.get); 
router.post("/", clientController.createClient); 
router.patch("/:id", clientController.updateClient); 
router.delete("/:id", clientController.deleteClient); 

module.exports = router;




