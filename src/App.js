// import './App.css';
import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import {
  Login,
  Signup,
  Navbar,
  Home,
  ProductDetail,
  Checkout,
  UpdateProduct,
} from "./components";
import { AuthContextProvider } from "./context/authContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: '#ff1744',
    },
  },
});

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:id",
        element: <ProductDetail/>,
      },
      {
        path: "/update",
        element: <UpdateProduct />,
      },
      {
        path: "/checkout/:id",
        element: <Checkout />,
      },
      {
        path: "/update/:id",
        element: <UpdateProduct/>,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <AuthContextProvider>
          <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
          </ThemeProvider>
        </AuthContextProvider>
      </div>
    </div>
  );
}

export default App;
