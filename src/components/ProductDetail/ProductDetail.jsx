import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Categories from "../../common/Categories/Categories";
import { Grid, Box, Typography, Chip, TextField, Button } from "@mui/material";

import { red } from "@mui/material/colors";

import { AuthContext } from "../../context/authContext";

import { ToastContainer, toast } from "react-toastify";

import "./ProductDetail.css";
import axios from "axios";
const colorRed = red[500];

const LoginAlert = (text) => {
  toast.error(text, { toastId: "login-alert" });
};

const ProductDetail = () => {
  const [num, setNum] = useState(1);
  const [product, setProduct] = useState({});
  const location = useLocation();

  const productId = location.pathname.slice(1);
  const navigate = useNavigate();

  const { token } = useContext(AuthContext);

  useEffect(() => {
    // get the product per id for product detail page
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/products/${productId}`);

        setProduct(res.data);
      } catch (e) {
        console.log(e.response);
      }
    };
    fetchProduct();
  }, []);

  const navigateToCheckout = () => {
    // passing the product info to the checkout page
    navigate(`/checkout/${productId}`, {
      state: { product, num },
    });
  };

  const handlePlaceOrder = () => {
    if (token) {
      navigateToCheckout();
    } else {
      LoginAlert("Please Login to Place Orders");
    }
  };

  const handleChange = (e) => {
    if (e.target.value > 0) {
      setNum(e.target.value);
    }
  };

  const transformedCategory = (val) => {
    if (val === "electronics") return "Electronics";
    if (val === "personalcare") return "Personal Care";
    if (val === "apparel") return "Apparel";
  };

  return (
    <div className="productDetails">
      <ToastContainer autoClose={2000} theme="colored" />

      <Categories />

      <Box sx={{ flexGrow: 0.5, mx: 16 }} className="details">
        <Grid
          container
          className="productSection"
          display="flex"
          direction="row"
          spacing={4}
          alignItems="flex-start"
          // sm={12}
          // md={12}
        >
          <Grid item xs={4} className="media">
            <img src={product.imageUrl} alt={product.name} />
          </Grid>
          <Grid item sx={{ pl: 6 }}  xs={8} className="description" >
            <div className="title">
              <Typography variant="h3">{product.name}</Typography>
              <Chip
                label={`Available Quantity: ${product.availableItems}`}
                color="primary"
              />
            </div>
            <div className="descDetails">
              <Typography variant="subtitle1" gutterBottom>
                Categories: <b>{transformedCategory(product.category)}</b>{" "}
              </Typography>
              <Typography variant="body1">{product.description}</Typography>
              <Typography variant="h4" color="secondary">
                ${product.price}
              </Typography>
            </div>

            <Box component="form" className="actions">
              <TextField
                required
                type="number"
                id="outlined-basic"
                label="Enter Quantity"
                variant="outlined"
                value={num}
                onChange={handleChange}
              />

              <Button
                size="medium"
                onClick={handlePlaceOrder}
                className="button"
                variant="contained"
                color="primary"
              >
                PLACE ORDER
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ProductDetail;
