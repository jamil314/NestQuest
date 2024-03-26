const express = require("express");
const router = express.Router();
const nestController = require("../controllers/nest");

router.get("/all", nestController.getAll);

module.exports = router;
