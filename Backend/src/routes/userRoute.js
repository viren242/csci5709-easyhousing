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
  isUserVerified,
  userProfile,
  changePassword,
} = require("../controllers/userController");

// Base Route
router.get("/", userRoot);

// Register App User Route

router.post(
  "/appUserRegistration",
  registrationValidationRules(),
  validateRequest,
  registerAppUser
);

// Register Super Admin Route

router.post(
  "/superAdminRegistration",
  registrationValidationRules(),
  validateRequest,
  registerSuperAdmin
);

// Login Super Admin Route

router.post(
  "/appUserLogin",
  loginValidationRules(),
  validateRequest,
  loginAppUser
);

// Login Super Admin Route

router.post(
  "/superAdminLogin",
  loginValidationRules(),
  validateRequest,
  loginSuperAdmin
);

// Profile Route
router.get("/userProfile", isUserVerified, userProfile);

// Change Password Route
router.post("/changePassword", isUserVerified, changePassword);

module.exports = router;
