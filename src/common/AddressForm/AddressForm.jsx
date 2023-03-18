import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
} from "@mui/material";

import { AuthContext } from "../../context/authContext";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

import "./AddressForm.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#ff1744",
    },
  },
});

const AddressForm = ({ saveAddressFunc, saveAddress }) => {
  const { token, userId, signedIn } = useContext(AuthContext);

  const [message, setMessage] = useState("");

  const [input, setInput] = useState({
    id: userId,
    name: "",
    contactNumber: "",
    city: "",
    landmark: "",
    street: "",
    state: "",
    zipcode: "",
    user: userId,
  });

  const fetchAddress = async () => {
    try {
      const res = await axios.get(`/addresses`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(res)
      const addressesByUserId = res.data.filter((item) => item.user === userId);

      saveAddressFunc(addressesByUserId);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAndTestAddress = async () => {
    try {
      const res = await axios.get(`/addresses`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      console.log(res)

      if (input.contactNumber !== "") {
        if (
          res.data.filter((add) => add.contactNumber === input.contactNumber)
        ) {
          setMessage("This is a duplicated contact number! Try a new one");
        }
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, [signedIn]);


  // THIS WILL POST AN ADDRESS IN THE DATABASE, THEN SAVE THEM IN THE ADDRESS
  const handleSubmit = async (e) => {
    e.preventDefault();

    fetchAndTestAddress();

    const found = saveAddress?.some((el) => el.street === input.street);
    // if the address to be submitted is not duplicated, save it
    if (!found) {
      try {
        //save address in the database
        await axios.post("/addresses", input, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        setTimeout(() => {
          setMessage("");
        }, 3000);

        setMessage("Your Address has been saved");
      } catch (err) {
        console.log(err.response);
      }
      fetchAddress();
    }

    setInput((prev) => ({ ...prev, contactNumber: "" }));
  };

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <ThemeProvider theme={theme}>
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
            <Typography component="h1" variant="h5">
              Add Address
            </Typography>

            <Box component="form" noValidate sx={{ my: 0.5 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                // id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="contactNumber"
                label="Contact Number"
                type="contact"
                // id="contactNumber"
                autoComplete="lastname"
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="email"
                label="Email address"
                type="email"
                // id="email"
                autoComplete="email"
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="street"
                label="Street"
                type="street"
                // id="street"
                autoComplete="street"
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="city"
                label="City"
                type="city"
                // id="city"
                autoComplete="city"
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="state"
                label="State"
                type="state"
                // id="state"
                autoComplete="state"
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="landmark"
                label="Landmark"
                type="landmark"
                // id="landmark"
                autoComplete="landmark"
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="zipcode"
                label="Zip Code"
                type="zipcode"
                // id="zip"
                autoComplete="zipcode"
                onChange={handleChange}
              />
              {message && (
                <Typography variant="body1" color="secondary">
                  {message}
                </Typography>
              )}

              {/* handle this button to submit the info */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                SAVE ADDRESS
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default AddressForm;
