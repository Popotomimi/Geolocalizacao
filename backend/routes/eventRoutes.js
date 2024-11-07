const express = require("express");
const eventController = require("../controllers/eventController");
const router = express.Router();

router.post("/create", eventController.createEvent);
router.get("/getall", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);
router.put("/update/:id", eventController.updateEvent);
router.delete("/delete/:id", eventController.deleteEvent);

module.exports = router;
