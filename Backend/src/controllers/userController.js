const bcrypt = require("bcryptjs");
const { SALT_VALUE, WEBSITE_LINK } = require("../config/index");
const { users } = require("../models");
const { sendEmail } = require("../utils/sendEmail");
const { APP_USER, SUPER_ADMIN } = require("../config/constants");

//User Root
const userRoot = (req, res) => {
  try {
    res.setHeader("Content_type", "application/json");
    res
      .status(200)
      .json({ message: "Welcome to User Management Module", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

//User registration of app-user

const registerAppUser = async (req, res) => {
  await userRegistration(req.body, APP_USER, res);
};

//User registration of Super Admin

const registerSuperAdmin = async (req, res) => {
  await userRegistration(req.body, SUPER_ADMIN, res);
};

// User Registration with different Roles
const userRegistration = async (user, role, res) => {
  try {
    res.setHeader("Content_type", "application/json");

    let EmailExists = await isEmailExists(user.email);
    if (EmailExists) {
      return res.status(400).json({
        message: "Email is already taken",
        success: false,
      });
    }
    const password = await bcrypt.hash(user.password, Number(SALT_VALUE));
    const userObj = {
      ...user,
      password,
      role,
    };
    // users.create(userObj);
    sendEmail(
      user.email,
      "Welcome to Easy Housing",
      {
        fullname: user.fullname,
        link: WEBSITE_LINK,
      },
      "../utils/templates/welcome.handlebars"
    );
    return res.status(201).json({
      message: "User is registered successfully!",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to create user account",
      error: error.message,
      success: false,
    });
  }
};

const isEmailExists = async (email) => {
  let user = await users.findOne({
    where: {
      email: email,
    },
  });
  if (user) return true;
  else return false;
};

module.exports = { userRoot, registerAppUser, registerSuperAdmin };
