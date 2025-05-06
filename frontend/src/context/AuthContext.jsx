import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "./axios";

// create context
const AuthContext = createContext();

const initialState = {
  user: null,
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload, loading: false };
    // case "SET_USER":
    // return { ...state, user: action.payload, loading: false };
    case "LOGOUT":
      return { ...state, user: null, loading: false };
    default:
      return state;
  }
};

// create provider
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get("/users/me", {
          withCredentials: true,
        });
        console.log("updated profule ", res.data);
        dispatch({ type: "SET_USER", payload: res.data.data });
      } catch (err) {
        dispatch({ type: "LOGOUT" });
      }
    };
    checkUser();
  }, []);

  const signup = async (credentials) => {
    const res = await axios.post("/users/signup", credentials, {
      withCredentials: true,
    });
    if (res.data?.status === 200 && res.data?.data.newUser) {
      return { success: true };
    } else {
      return { success: false, message: "Something went wrong" };
    }
  };

  const login = async (credentials) => {
    const res = await axios.post("/users/login", credentials, {
      withCredentials: true,
    });
    if (res.data?.status === 200 && res.data?.data.newUser) {
      dispatch({ type: "SET_USER", payload: res.data.data.newUser });
      return { success: true, user: res.data.data.newUser };
    } else {
      return { success: false, message: "Invalid credentials or response" };
    }
  };

  const logout = async () => {
    await axios.post("/users/logout", {}, { withCredentials: true });
    dispatch({ type: "LOGOUT" });
  };

  const getProducts = async () => {
    const res = await axios.get("/products/", {
      withCredentials: true,
    });
    return res.data.data;
  };

  const addProduct = async (product) => {
    const res = await axios.post("/products/addProduct", product, {
      withCredentials: true,
    });
  };

  const updateProduct = async (id, product) => {
    const res = await axios.put(`/products/${id}`, product, {
      withCredentials: true,
    });
    console.log(res);
  };

  const getPublicProducts = async (id) => {
    const res = await axios.get(`/products/${id}`, {
      withCredentials: false,
    });
    return res.data.data;
  };

  const getProductById = async (id) => {
    const res = await axios.get(`/products/getProductById/${id}`, {
      withCredentials: true,
    });
    return res.data.data;
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        updateProduct,
        addProduct,
        getProductById,
        getProducts,
        signup,
        getPublicProducts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 3. Create custom hook for easy access
export const useAuth = () => useContext(AuthContext);
