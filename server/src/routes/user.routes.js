const express = require("express");

const auth = require("../middleware/auth.middleware");
const controller = require("../controller/user.controller");

const router = express.Router();

router.get("/me", auth, controller.me);

module.exports = router;
