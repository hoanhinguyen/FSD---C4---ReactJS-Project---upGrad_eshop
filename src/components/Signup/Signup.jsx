import React, { useState, useContext, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../../context/authContext";

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
      {2021}
      {"."}
    </Typography>
  );
}

const Signup = () => {
  const [input, setInput] = useState({
    email: "",
    role: ["user"],
    password: "",
    firstName: "",
    lastName: "",
    contactNumber: "",
  });
  const [error, setError] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const navigate = useNavigate();

  const { getAdmin, getUsersContext, users } = useContext(AuthContext);

  // get the users for login process
  const gettingUserData = async () => {
    try {
      await getAdmin();
      await getUsersContext();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    gettingUserData();
  }, []);

  // This function is used to validate password and email input
  const validating = (password, emailInput) => {
    if (confirmPass.length < 6) {
      setError("Password length should be greater than 6");
      return true;
    } else if (confirmPass != password) {
      setError("Mismatched password! Try again");
      return true;
    } else if (
      users?.filter((user) => user.email.includes(emailInput)).length != 0
    ) {
      setError("This email has been used");
      return true;
    } else {
      return false;
    }
  };

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();

    const validation = validating(input.password, input.email);

    if (validation === false) {
      try {
        // sign up the user
        await axios.post("/auth/signup", input);
        gettingUserData();
      } catch (err) {
        console.log(err);
      }
      
      navigate("/login");
    }
  };

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="xs">
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="firstName"
              autoFocus
              onChange={handleChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="lastName"
              label="Last Name"
              type="lastName"
              id="lastName"
              autoComplete="lastName"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email address"
              type="email"
              id="email"
              autoComplete="email"
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
              autoComplete="password"
              onChange={handleChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="confirmPassword"
              onChange={(e) => setConfirmPass(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="contact"
              label="Contact Number"
              type="contact"
              id="contact"
              autoComplete="contact"
              onChange={handleChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmitSignUp}
              color="primary"
            >
              Sign Up
            </Button>
            {error && (
              <Typography variant="body1" color="secondary">
                {error}
              </Typography>
            )}
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link to="/login" variant="body2">
                  {"Already have an account? Log In"}
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

export default Signup;
