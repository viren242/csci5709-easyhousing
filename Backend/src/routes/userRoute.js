const express = require("express");
const router = express.Router();
const { userRoot } = require("../controllers/userController");

router.get("/", userRoot);
// router.get("/register", rootPage);

// router.get("/users", getAllUsers);
// router.post("/add", addUser);
// router.get("/user/:id", getUserById);
// router.put("/update/:id", updateUser);

module.exports = router;
