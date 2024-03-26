const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const checkAuth = require("../middlewares/auth_jwt");

router.post("/register", userController.registerUser);
router.post("/login", userController.login);

router.get("/:id", userController.getUserById);

router.get("/emailavailability/:email", userController.emailAvailable);
router.get("/usernameavailability/:username", userController.usernameAvailable);

module.exports = router;
