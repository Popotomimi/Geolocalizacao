// routes/users.js
const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/register", userController.register);
router.get("/getall", userController.getAllUsers);
router.get("/getbyevent/:eventId", userController.getAllUsersByEvent);
router.post("/checkout", userController.checkout);

module.exports = router;
