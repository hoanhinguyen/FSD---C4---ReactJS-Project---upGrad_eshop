import React, { useEffect, useState, useContext } from "react";

import { useNavigate,  useLocation } from "react-router-dom";
import axios from "axios";
import useLocalStorage from "../../hooks/useLocalStorage";
import { AuthContext } from "../../context/authContext";

import CreatableSelect from "react-select/creatable";

import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

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

const catOptions = [
  {
    value: "electronics",
    label: "Electronics",
    name: "category",
    isFixed: true,
  },
  { value: "apparel", label: "Apparel", name: "category" },
  { value: "personalcare", label: "Personal Care", name: "category" },
];

const selectStyles = {
  menu: (base) => ({
    ...base,
    zIndex: 100,
  }),
};

const UpdateProduct = () => {
  const [input, setInput] = useState({
    name: "",
    category: "",
    manufacturer: "",
    price: "",
    imageUrl: "",
    description: "",
    availableItems: "",
  });

  const location = useLocation();

  const productId = location.pathname.slice(8);

  const [header, setHeader] = useLocalStorage("title", "Add Product");

  const navigate = useNavigate();

  const { Alert, ToastContainer, token } = useContext(AuthContext);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`/products/${productId}`);
        setInput(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    // if there is a product id, the page should be used to modify the product
    if (productId) {
      setHeader("Modify Product");
      // this can help fill in the product info in the text field
      getProduct();
    } else {
      setHeader("Add Product");
    }
  }, []);

  const handleChange = (e) => {
    if (e.name === "category") {
      console.log(e.name);
      setInput((prev) => ({ ...prev, [e.name]: e.value }));
    } else {
      setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleSubmit = async (e) => {
    console.log(input);
    e.preventDefault();
    if (productId) {
      try {
        await axios.put(`/products/${productId}`, input, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ` + token,
          },
        });
      } catch (err) {
        console.log(err);
      }

      navigate("/", {
        state: { message: `Product ${input.name} modified successfully` },
      });
    } else {
      try {
        await axios.post(`/products`, input, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ` + token,
          },
        });
        Alert(`Product ${input.name} added successfully`, "success2");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer autoClose={2000} theme="colored" />

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
              {header}
            </Typography>

            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                value={input.name}
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={handleChange}
              />

              <CreatableSelect
                name="category"
                value={
                  productId
                    ? catOptions.filter((opt) =>
                        opt.value.includes(input.category)
                      )
                    : input.category
                    ? catOptions.filter((opt) =>
                        opt.value.includes(input.category)
                      )
                    : ""
                }
                options={catOptions}
                clearable={false}
                styles={selectStyles}
                onChange={handleChange}
                color="primary"
              />
              <TextField
                value={input.manufacturer}
                margin="normal"
                required
                fullWidth
                name="manufacturer"
                label="Manufacturer"
                type="manufacturer"
                id="manufacturer"
                autoComplete="manufacturer"
                onChange={handleChange}
              />
              <TextField
                value={input.availableItems}
                margin="normal"
                required
                fullWidth
                name="availableItems"
                label="Available Items"
                type="number"
                id="availableItems"
                autoComplete="qavailableItemsty"
                onChange={handleChange}
              />
              <TextField
                value={input.price}
                margin="normal"
                required
                fullWidth
                name="price"
                label="Price"
                type="number"
                id="price"
                autoComplete="price"
                onChange={handleChange}
              />
              <TextField
                value={input.imageUrl}
                margin="normal"
                required
                fullWidth
                name="imageUrl"
                label="Image URL"
                type="imageUrl"
                id="imageUrl"
                autoComplete="imageUrl"
                onChange={handleChange}
              />
              <TextField
                value={input.description}
                margin="normal"
                required
                fullWidth
                name="description"
                label="Product Description"
                type="description"
                id="description"
                autoComplete="description"
                onChange={handleChange}
              />
              <Button
                className="button"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                {header.toUpperCase()}
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default UpdateProduct;
