// Author: Anuj Dev (B00900887)

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import React, { useContext } from "react";
import { AppContext } from "../../context/userContext";

const AccountProfile = () => {
  const {
    state: { authenticated, currentUser },
  } = useContext(AppContext);
  return (
    <>
      <Card>
        <CardContent>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Avatar
              src={currentUser.imgURL}
              sx={{
                height: 100,
                mb: 2,
                width: 100,
              }}
            />
            <Typography color="textPrimary" gutterBottom variant="h5">
              {currentUser.firstName + " " + currentUser.lastName}
            </Typography>
          </Box>
        </CardContent>
        <Divider />

        <CardActions>
          <Button
            color="primary"
            fullWidth
            variant="text"
            startIcon={<CameraAltIcon />}
          >
            Upload picture
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default AccountProfile;
