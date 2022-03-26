// Author: Anuj Dev (B00900887)

/* ROUTERS  */
export const ROUTES = {
  // COMMON ROUTES
  HOMEPAGE: "/",
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgotPassword",
  SIGNUP: "/signup",
  ADD_PROPERTY: "/add_property",
  UPDATE_PROPERTY: "/update_property/:propertyId",
  PROPERTY_LISTING: "/property_list",
  PROPERTY_DETAILS: "/propertyDetails/:propertyId",
  USER_PROPERTY_LISTING: "/user_property_list/:userId",

  NOT_FOUND: "*",
  ERROR: "/error",

  //Private Route
  USER_PROFILE: "/profile",
};

/* Authentication */
export const TOKEN = "TOKEN";
export const USER = "USER";
export const ADMIN = "ADMIN";
export const USER_ID = "USER_ID";

export const APP_ROLES = {
  SUPER_ADMIN: "super_admin",
  APP_USER: "app_user",
};
