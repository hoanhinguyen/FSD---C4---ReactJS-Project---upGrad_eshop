import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { AuthContext } from "../../context/authContext.js";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        upGrad
      </Link>{" "}
      {"."}
    </Typography>
  );
}

const LoginAlert = (text) => {
  toast.error(text, { toastId: "login-alert" });
};

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const {
    login,
    setUsername,
    setSignedIn,
    getAdmin,
    getUsersContext,
    getCurrentUser,
    token,
  } = useContext(AuthContext);

  const gettingUsersData = async () => {
    try {
      await getAdmin();
      await getUsersContext();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (token) {
      gettingUsersData();
      getCurrentUser();

      navigate("/", { state: { message: "Successfully Login" } });
    }
  }, [token]);

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const loginProcess = async () => {
    try {
      await login(input);
      setSignedIn(prev => !prev);
      // navigate("/", { state: { message: "Successfully Login" } });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // set and save username for checking the current user for login
    setUsername(input.username);
    localStorage.setItem("username", JSON.stringify(input.username));
    gettingUsersData();

    if (token === "" && loginProcess() !== true) {
      LoginAlert("Wrong username or password");
    }
  };

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="xs">
        <ToastContainer autoClose={2000} theme="colored" />

        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon backgroundColor="red" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="username"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
              color="primary"
            >
              SIGN IN
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
};

export default Login;
