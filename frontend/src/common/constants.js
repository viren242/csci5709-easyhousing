// Author: Anuj Dev (B00900887)

/* ROUTERS  */
export const ROUTES = {
  // COMMON ROUTES
  HOMEPAGE: "/",
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgotPassword",
  RESET_PASSWORD: "/api/user/reset/:userId/:jwtToken",
  SIGNUP: "/signup",
  ADD_PROPERTY: "/add_property",
  UPDATE_PROPERTY: "/update_property/:propertyId",
  PROPERTY_LISTING: "/property_list",
  PROPERTY_DETAILS: "/propertyDetails/:propertyId",
  USER_PROPERTY_LISTING: "/user_property_list/:userId",
  PROFILE: "/profile",
  EDIT_PROFILE: "/editprofile",
  CHANGEPASSWORD: "/changepassword",
  LOGOUT: "/logout",
  REVIEW: "/review",
  RATING: "/rating",
  BOOK_APPOINTMENT: "/book-appointment/:userId/:propertyId",
  CANCEL_APPOINTMENT: "/cancel-appointment/:userId/:propertyId",
  APPOINTMENTS: "/appointments",
  VIEW_SERVICES: "/services",
  ADD_SERVICE: "/services/create",
  EDIT_SERVICE: "services/edit/:id",
  VIEW_FAVORITES: "/view_favorites",
  VIEW_FAVORITES_DETAILS: "/view_favorites_details/:propertyId",

  NOT_FOUND: "*",
  ERROR: "/error",

  //Private Route
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
