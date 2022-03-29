// Author: Anuj Dev (B00900887)

/* ROUTERS  */
export const ROUTES = {
  // COMMON ROUTES
  HOMEPAGE: "/",
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgotPassword",
  SIGNUP: "/signup",
  PROFILE: "/profile",
  EDIT_PROFILE: "/editprofile",
  CHANGEPASSWORD: "/changepassword",
  LOGOUT: "/logout",
  ROOMMATE_FINDER_MY_LISTINGS: "/myListingPage",
  NOT_FOUND: "*",
  ERROR: "/error",
  ROOMMATE_FINDER_EDIT_LISTINGS: "/editListingPage",

  //Private Route
  USER_PROFILE: "/profile",
  ROOMMATE_FINDER:"/roommateHomepage"
  // USER_PROFILE: "/profile",
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
