const express = require("express");
const router = express.Router();
const { userRoot } = require("../controllers/userController");

router.get("/", userRoot);
// router.get("/register", rootPage);

module.exports = router;
