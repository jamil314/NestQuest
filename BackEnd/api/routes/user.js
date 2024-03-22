const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const checkAuth = require("../middlewares/auth_jwt");

router.get("/:id", userController.getUserById);

module.exports = router;
