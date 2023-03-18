import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/authContext.js";

import { Grid } from "@mui/material";
import {
  Product,
  Sorting,
  Categories,
  ConfirmDialog,
} from "../../common/index.js";

import "./Home.css";

const Home = () => {
  const [select, setSelect] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");
  const location = useLocation();
  let message = "";

  const [categories, setCategories] = useState([]);
  const {
    setProducts,
    fetchProducts,
    Alert,
    ToastContainer,
    products,
    getAdmin,
    getUsersContext,
    users,
    getCurrentUser,
    signedIn
  } = useContext(AuthContext);

  const [deleteProduct, setDeleteProduct] = useState(false);

  // this is used to invoke alert for successful modification from other pages
  if (location.state !== null) {
    message = location.state.message;
  }

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

    if (users) {
      getCurrentUser();
    }
  },[]);

  // when this homepge is on and we have a token => the user logined => getting user databases
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/products/categories");
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();
    console.log(categories);
    if (location.state !== null) {
      Alert(message, "success1");
    }
    return () => {
      window.history.replaceState({}, document.title);
    };
  }, []);

  useEffect(() => {
    const fectchingProducts = async () => {
      await fetchProducts();
    };

    fectchingProducts();
  }, [deleteProduct]);

  const handleChange = async (val) => {
    setSelect(val);
    if (val === "asc") {
      setProducts((products) =>
        products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
      );
    } else if (val === "desc") {
      setProducts((products) =>
        products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
      );
    } else if (val === "new") {
      setProducts((products) => products.reverse());
    } else {
      try {
        await fetchProducts();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="home">
      <ConfirmDialog />
      <ToastContainer autoClose={2000} theme="colored" />

      {/* passing a function here when there is any action from the users in the categries files */}
      <Categories
        setCurrentCategoryFunc={setCurrentCategory}
        currentCategory={currentCategory}
      />

      <Sorting selectItem={select} handleChangeFunc={handleChange} />

      <main className="products">
        <Grid
          container
          spacing={4}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          {products?.map((product) => (
            <Grid container item key={product.id} xs={12} md={4} lg={4} sm={12}>
              <Product
                product={product}
                Notice={Alert}
                setDeleteProductFunc={setDeleteProduct}
              />
            </Grid>
          ))}
        </Grid>
      </main>
    </div>
  );
};

export default Home;
