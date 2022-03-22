// Author: Anuj Dev (B00900887)

const express = require("express");
const {
  registrationValidationRules,
  loginValidationRules,
  changePasswordValidationRules,
  updateProfileValidationRules,
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
  updateProfile,
  deleteUserProfile,
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
router.post(
  "/changePassword",
  isUserVerified,
  changePasswordValidationRules(),
  validateRequest,
  changePassword
);

// Update User profile
router.put(
  "/updateProfile/:id",
  isUserVerified,
  updateProfileValidationRules(),
  validateRequest,
  updateProfile
);

router.delete("/deleteUserProfile/:id", isUserVerified, deleteUserProfile);
module.exports = router;
