import axios from "axios";
import { createContext, useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("access-token")) || ""
  );

  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("userId")) || ""
  );

  const [adminToken, setAdminToken] = useState("");

  const [signedIn, setSignedIn] = useState(false);

  const [products, setProducts] = useState([]);

  const [users, setUsers] = useState(
    // JSON.parse(localStorage.getItem("users")) ||
    []
  );


  const [username, setUsername] = useState(
    JSON.parse(localStorage.getItem("username")) || ""
  );

  const [role, setRole] = useState(
    JSON.parse(localStorage.getItem("role")) || "USER"
  );

  const login = async (inputs) => {
    try {
      const res = await axios.post("/auth/signin", inputs); ///login

      setToken(res.data.token);
      setSignedIn((prev) => !prev);
      localStorage.setItem("access-token", JSON.stringify(res.data.token));
    } catch (e) {
      console.log(e)
    }

  };

  // getting users from admin account for login
  const getAdmin = async () => {
    const adminInputs = {
      username: "john.doe@xyz.com",
      password: "pass123",
    };
    try {
      const res = await axios.post("/auth/signin", adminInputs); ///login

      setAdminToken(res.data.token);
    } catch (e) {
      // console.log(e);
    }
  };

  //getting users data with admin token
  const getUsersContext = async () => {
    try {
      const res = await axios.get(`/users`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      });

      setUsers(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getCurrentUser = () => {
    const currentUserData = users?.filter((item) =>
      item?.email?.includes(username)
    )[0];

    const currentRole = currentUserData?.roles[0]?.name;
    const currentUserId = currentUserData?.id;

    // console.log(currentUserId)

    if (currentUserData) {
      setCurrentUser(currentUserData);
    } else {
      setCurrentUser({});
    }

    if (currentRole) {
      setRole(currentRole);
    } else {
      setRole("");
    }

    if (currentUserId) {
      setUserId(currentUserId);
    } else {
      setUserId("");
    }
  };

  useEffect(() => {
    const gettingUsersData = async () => {
      try {
        await getAdmin();
        await getUsersContext();
      } catch (err) {
        console.log(err);
      }
    };

    gettingUsersData();

    if (users !== []) {
      getCurrentUser();
    }
  }, [signedIn]);

  useEffect(() => {
    localStorage.setItem("access-token", JSON.stringify(token));
  }, [token]);

  useEffect(() => {
    setCurrentUser(currentUser);
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("role", JSON.stringify(role));
  }, [role]);

  useEffect(() => {
    localStorage.setItem("userId", JSON.stringify(userId));
  }, [userId]);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access-token");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");

    setCurrentUser(null);
    setToken("");
    setUsername("");
    setRole("");
    setUserId("")
  };

  // API calls to the products 
  const fetchProducts = async () => {
    try {
      const res = await axios.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const Alert = (text, id) => {
    toast.success(text, { toastId: id });
  };

  return (
    <AuthContext.Provider
      value={{
        fetchProducts,
        login,
        logout,
        products,
        setProducts,
        Alert,
        ToastContainer,
        currentUser,
        token,
        setUsername,
        setUsers,
        role,
        username,
        users,
        getCurrentUser,
        getUsersContext,
        setRole,
        getAdmin,
        setSignedIn,
        signedIn,
        userId
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
