// Author: Anuj Dev (B00900887)

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SALT_VALUE, WEBSITE_LINK, JWT_SECRET } = require("../config/index");
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

//User Login of app-user

const loginAppUser = async (req, res) => {
  await userLogin(req.body, APP_USER, res);
};

//User Login of Super Admin

const loginSuperAdmin = async (req, res) => {
  await userLogin(req.body, SUPER_ADMIN, res);
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
      isVerified: false,
    };
    users.create(userObj);
    sendEmail(
      user.email,
      "Welcome to Easy Housing",
      {
        fullname: user.firstName + user.lastName,
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

// User Registration with different Roles
const userLogin = async (user, role, res) => {
  try {
    res.setHeader("Content_type", "application/json");

    const userExist = await users.findOne({
      email: user.email,
    });
    if (!userExist) {
      return res.status(400).json({
        message: "Email Does not Exist with this Email",
        success: false,
      });
    }
    if (role != userExist.role) {
      return res.status(403).json({
        message: "You are not authorized to perform this operation!",
        success: false,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      user.password,
      userExist.password
    );

    if (isPasswordCorrect) {
      jwtPayload = {
        id: userExist.id,
        firstName: userExist.firstName,
        lastName: userExist.lastName,
        email: userExist.email,
        role: userExist.role,
      };
      let token = jwt.sign(jwtPayload, JWT_SECRET, { expiresIn: "1h" });
      let response = {
        id: user.id,
        firstName: userExist.firstName,
        lastName: userExist.lastName,
        email: userExist.email,
        role: userExist.role,
        token: `Bearer ${token}`,
        expiresIn: 1,
      };

      return res.status(200).json({
        ...response,
        message: "Logged In successfully!",
        success: true,
      });
    } else {
      return res.status(401).json({
        message: "Password is Invalid",
        success: false,
      });
    }
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
module.exports = {
  userRoot,
  registerAppUser,
  registerSuperAdmin,
  loginAppUser,
  loginSuperAdmin,
};
