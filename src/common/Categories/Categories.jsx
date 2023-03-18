import React, { useEffect, useState, useContext } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/authContext";
import axios from "axios";

import "./Categories.css";

export default function Categories() {
  const [alignment, setAlignment] = React.useState("all");
  const navigate = useNavigate();

  const { setProducts, fetchProducts } = useContext(AuthContext);

  const handleChange = async (event, newAlignment) => {
    
    setAlignment(newAlignment);

    if (newAlignment !== "all") {
      
      await fetchProducts();

      setProducts((products) =>
        products.filter((item) => item.category.includes(newAlignment))
      );
    } else {
      try {
        const res = await axios.get(`/products`);
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      className="categories"
    >
      <ToggleButton value="all" onClick={() => navigate(`/`)}>
        ALL
      </ToggleButton>

      <ToggleButton value="apparel" type="submit"  >
        APPAREL
      </ToggleButton>

      <ToggleButton
        value="electronics"
        type="submit"
      >
        ELECTRONICS
      </ToggleButton>

      <ToggleButton
        value="personalcare"
        type="submit"
      >
        PERSONAL CARE
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
