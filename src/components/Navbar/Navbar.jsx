import React, { useContext, useEffect, useState } from "react";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  InputBase,
  createTheme
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

import { ShoppingCart, Token } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/authContext.js";

import "./Navbar.css";


const Navbar = () => {
  //these 2 data will be fetched from AuthContext via Login or signup
  const { token, logout, setProducts, fetchProducts, role, getCurrentUser, getAdmin, getUsersContext, users } =
    useContext(AuthContext);
 
  const [input, setInput] = useState("");

  useEffect(() => {

    const gettingUsersData = async () => {
      try {
        await getAdmin();
        await getUsersContext();
      } catch (er) {
        console.log(er);
      }
    };

    // this line is used to get the users to get the current user for the logined
    gettingUsersData();

    if (token.length!==0) {
      getCurrentUser();
    }
  });

  const navigate = useNavigate();

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const handleLogOut = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    setProducts((products) =>
      products.filter((product) =>
        product.name.toLowerCase().includes(input.toLowerCase())
      )
    );

    const fetchingProducts = async () => {
      fetchProducts(`/products`);
    };

    if (input === "") {
      fetchingProducts();
    }
  }, [input]);

  const handleChange = async (e) => {
    setInput(e.target.value);
  };

  return (
    <Box>
      <AppBar position="static" color='primary' >
        <Toolbar className="navContent">
          <div className="logo">
            <ShoppingCart
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></ShoppingCart>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              upGrad E-Shop
            </Typography>
          </div>

          {/* if an admin, user this */}
          {token ? (
            <>
              <Search
                sx={{ flexGrow: 0.1 }}
                className="search"
                onChange={handleChange}
                value={input}
              >
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  value={input}
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              <div className="buttons">
                <Link className="linkNav" to="/" color="inherit">
                  Home
                </Link>
                {(role ==="ADMIN") && (
                  <Link className="linkNav" to="/update" color="inherit">
                    Add Product
                  </Link>
                )}
                <Button
                  onClick={handleLogOut}
                  variant="contained"
                  color='secondary'
                >
                  LOGOUT
                </Button>
              </div>
            </>
          ) : (
            <>
            <div>
              <Link className="linkNav" to="/login" color="inherit">
                Login
              </Link>
              <Link className="linkNav" to="/signup" color="inherit">
                Sign Up
              </Link>
            </div>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
