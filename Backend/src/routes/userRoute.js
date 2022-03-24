const express = require("express");
const {
  registrationValidationRules,
  validateRequest,
} = require("../utils/userValidation");

const router = express.Router();
const {
  userRoot,
  registerAppUser,
  registerSuperAdmin,
} = require("../controllers/userController");

// Base Route
router.get("/", userRoot);

// Register App User Route

router.post(
  "/register-app-user",
  registrationValidationRules(),
  validateRequest,
  registerAppUser
);

// Register Super Admin Route

router.post(
  "/register-super-admin",
  registrationValidationRules(),
  validateRequest,
  registerSuperAdmin
);

module.exports = router;
