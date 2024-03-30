const express = require("express");
const router = express.Router();
const nestController = require("../controllers/nest");

const verifyToken = require("../middlewares/auth_jwt");

router.get("/byid/:id", nestController.getNestById);
router.get("/all", nestController.getAll);
router.post("/new", verifyToken, nestController.craeteNest);

module.exports = router;
