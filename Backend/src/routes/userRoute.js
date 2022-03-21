// Author: Anuj Dev (B00900887)

const express = require("express");
const {
  registrationValidationRules,
  loginValidationRules,
  validateRequest,
} = require("../utils/userValidation");

const router = express.Router();
const {
  userRoot,
  registerAppUser,
  registerSuperAdmin,
  loginAppUser,
  loginSuperAdmin,
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

// Login Super Admin Route

router.post(
  "/login-app-user",
  loginValidationRules(),
  validateRequest,
  loginAppUser
);

// Login Super Admin Route

router.post(
  "/login-super-admin",
  loginValidationRules(),
  validateRequest,
  loginSuperAdmin
);

module.exports = router;
