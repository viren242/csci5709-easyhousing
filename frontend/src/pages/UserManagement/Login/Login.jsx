import React, { useState, useContext } from "react";
import MainScreen from "../../../assets/images/LoginPage.png";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Navbar from "../../NavigationBar/Navbar";
import Footer from "../../Footer/Footer";
import axios_api from "../../../common/axios";
import jwtDecode from "jwt-decode";
import { AppContext } from "../../../context/userContext";
import * as ActionTypes from "../../../common/actionTypes";

const Login = () => {
  const {
    state: { authenticated, currentUser, userId, authToken },
    dispatch,
  } = useContext(AppContext);
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);

  const onSubmit = (data) => {
    const { email, password } = data;
    const loginCredentials = { email, password };
    axios_api
      .post("/users/appUserLogin", loginCredentials)
      .then((response) => {
        if ((response.data.success = true)) {
          const { data } = response;
          debugger;
          const decoded = jwtDecode(data.token);
          console.log(authenticated, currentUser, userId, authToken);
          dispatch({ type: ActionTypes.SET_TOKEN, data: data.token });
          dispatch({ type: ActionTypes.SET_CURRENT_USER, data: data });
          dispatch({ type: ActionTypes.SET_USER_ID, data: decoded.id });
          dispatch({ type: ActionTypes.SET_AUTHENTICATED, data: true });
          navigate("/");
        } else {
          setOpen(true);
          setIsLoggedIn(false);
        }
      })
      .catch((err) => {
        setOpen(true);
        setIsLoggedIn(false);
      });
    reset();
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      {/* <Navbar /> */}
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${MainScreen})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "black" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                {...register("email", {
                  required: "Email is Required",
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message:
                      "Please enter valid email address, Example (email_id@provider.com)",
                  },
                })}
                onKeyUp={() => {
                  trigger("email");
                }}
              />
              {errors.email && (
                <Typography component="subtitle2" sx={{ color: "red" }}>
                  {errors.email.message}
                </Typography>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password", {
                  required: "Password is Required",
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                    message:
                      "Please enter valid password, Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",
                  },
                })}
                onKeyUp={() => {
                  trigger("password");
                }}
              />
              {errors.password && (
                <Typography component="subtitle2" sx={{ color: "red" }}>
                  {errors.password.message}
                </Typography>
              )}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  Invalid Email Address or Password
                </Alert>
              </Snackbar>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item xs></Grid>
                <Grid item>
                  <Link
                    onClick={(event) => navigate("/signup")}
                    variant="body2"
                  >
                    {"Already Have Account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* <Footer /> */}
    </>
  );
};

export default Login;