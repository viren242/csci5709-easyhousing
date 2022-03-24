import React, { useState, useContext } from "react";
import NavigationBar from "../NavigationBar/Navbar";
import { AppContext } from "../../context/userContext";

const HomePage = () => {
  const {
    state: { authenticated, currentUser, userId, authToken },
    dispatch,
  } = useContext(AppContext);
  console.log(authenticated, currentUser, userId, authToken);
  return (
    <>
      <NavigationBar />
    </>
  );
};

export default HomePage;
