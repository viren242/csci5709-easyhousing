// Author: Viren Babubhai Malavia (B00895669)

import React, { useState, useContext } from "react";
import { AppContext } from "../../context/userContext";
import ImageSection from "./components/ImageSection";
import PropertiesHomePage from "./components/PropertiesHomePage";
import Footer from "../Footer/Footer";
import AdminNavbar from "../NavigationBar/AdminNavbar";

const AdminHomePage = () => {
  const {
    state: { authenticated, currentUser, userId, authToken },
    dispatch,
  } = useContext(AppContext);
  return (
    <>
      <AdminNavbar />
      <ImageSection />
      <PropertiesHomePage />
      <Footer />
    </>
  );
};

export default AdminHomePage;
