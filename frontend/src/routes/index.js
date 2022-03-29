// Author: Anuj Dev (B00900887)

import React, { useContext, useEffect } from "react";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";

//! User Files

import * as ActionTypes from "../common/actionTypes";
import jwtDecode from "jwt-decode";
import App from "../app/App";
import Error from "../common/error";
import { AppContext } from "../context/userContext";
import { ROUTES, TOKEN } from "../common/constants";
import Login from "../pages/UserManagement/Login/Login";
import Signup from "../pages/UserManagement/Signup/Signup";
import EditUserProfile from "../pages/UserProfile/EditProfile";
import Logout from "../Components/Logout";
import ChangePassword from "../pages/UserProfile/ChangePassword";
import Profile from "../pages/UserProfile/Profile";

// import PrivateRoute from "PrivateRoute";
import Homepage from "../pages/HomePage/index";
import RoommateHomepage from "../pages/RoommateFinder/RoomateHomePage";
import MyListings from "../pages/RoommateFinder/MyListings";
import EditRoomatesAd from "../pages/RoommateFinder/EditRoomatesAd";

function Routing() {
  const { initializeAuth, dispatch } = useContext(AppContext);
  const location = useLocation();
  const openPages = [
    {
      pageLink: ROUTES.HOMEPAGE,
      view: Homepage,
    },
    {
      pageLink: ROUTES.LOGIN,
      view: Login,
    },
    {
      pageLink: ROUTES.SIGNUP,
      view: Signup,
    },
    {
      pageLink: ROUTES.PROFILE,
      view: Profile,
    },
    {
      pageLink: ROUTES.EDIT_PROFILE,
      view: EditUserProfile,
    },
    {
      pageLink: ROUTES.CHANGEPASSWORD,
      view: ChangePassword,
    },
    {
      pageLink: ROUTES.LOGOUT,
      view: Logout,
    },

    {
      pageLink: ROUTES.ERROR,
      view: Error,
    },
    {
      pageLink: ROUTES.ROOMMATE_FINDER,
      view: RoommateHomepage
    },
    {
      pageLink: ROUTES.ROOMMATE_FINDER_MY_LISTINGS,
      view: MyListings
    },
    {
      pageLink: ROUTES.ROOMMATE_FINDER_EDIT_LISTINGS,
      view: EditRoomatesAd
    }


  ];

  useEffect(() => {
    initializeAuth();
    if (localStorage.getItem(TOKEN)) {
      const token = localStorage.getItem(TOKEN);
      const decoded = jwtDecode(token);
      const expiresAt = decoded.exp;
      const currentTime = Date.now();

      if (expiresAt < currentTime / 1000) {
        dispatch({ type: ActionTypes.LOGOUT });
      }
    }
  }, []);

  const routes = (
    <Routes location={location}>
      {openPages.map((page, index) => {
        return (
          <Route
            exact
            path={page.pageLink}
            element={<page.view />}
            key={index}
          />
        );
      })}
      {/* <Route exact path={ROUTES.HOMEPAGE} element={<PrivateRoute />}>
        <Route exact path={ROUTES.MAIN} element={<App />} />
      </Route> */}
      <Route path={ROUTES.NOT_FOUND} element={<Navigate to={ROUTES.ERROR} />} />
    </Routes>
  );

  return <div className="container">{routes}</div>;
}

export default Routing;
