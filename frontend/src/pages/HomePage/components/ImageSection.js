// Author: Anuj Dev (B00900887)

import * as React from "react";
import { Button, Typography } from "@mui/material";
import ImageSectionLayout from "../components/ImageSectionLayout";
import MainScreen from "../../../assets/images/Signup.jpg";

export default function ProductHero() {
  return (
    <ImageSectionLayout
      sxBackground={{
        backgroundImage: `url(${MainScreen})`,
        backgroundColor: "#7fc7d9", // Average color of the background image.
        backgroundPosition: "center",
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: "none" }}
        src={MainScreen}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Your One Stop Solution For All Your Housing Needs
      </Typography>
      <Button
        color="primary"
        variant="contained"
        size="large"
        component="a"
        sx={{ minWidth: 200, mt: 15 }}
      >
        View All Properties
      </Button>
    </ImageSectionLayout>
  );
}
