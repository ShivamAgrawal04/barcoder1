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
  loading: true,
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
    try {
      const res = await axios.post("/users/signup", credentials, {
        withCredentials: true,
      });
      console.log(res);
      if (res?.data?.status === 200 && res?.data?.data) {
        return { success: true, message: res?.data?.message };
      }
    } catch (error) {
      return { success: false, message: error.response?.data?.message };
    }
  };

  const login = async (credentials) => {
    try {
      const res = await axios.post("/users/login", credentials, {
        withCredentials: true,
      });

      if (res.data?.status === 200 && res.data?.data.newUser) {
        dispatch({ type: "SET_USER", payload: res.data.data.newUser });
        return {
          success: true,
          user: res.data.data.newUser,
          message: res.data.message || "Login successful",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message,
      };
    }
  };

  const logout = async () => {
    try {
      const res = await axios.post(
        "/users/logout",
        {},
        { withCredentials: true }
      );
      dispatch({ type: "LOGOUT" });
      return { success: true, message: res?.data?.message };
    } catch (error) {
      return { success: false, message: error?.response?.data?.message };
    }
  };

  const getProducts = async () => {
   try{
      const res = await axios.get("/products", {
      withCredentials: true,
    });
    console.log("authContext getProducts",res)
    
   }catch(error){
     return {success:false,message:error?.response?.data?.message}
   }
  };

  const addProduct = async (product) => {
    try {
      const res = await axios.post("/products/addProduct", product, {
        withCredentials: true,
      });
      return { success: true, message: res?.data?.message };
    } catch (error) {
      return { success: false, message: error?.response?.data?.message };
    }
  };

  const updateProduct = async (id, product) => {
    try {
      const res = await axios.put(`/products/${id}`, product, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return { success: true, message: res?.data?.message };
    } catch (error) {
      return { success: false, message: error?.response?.data.message };
    }
  };

  const getPublicProducts = async (id) => {
    const res = await axios.get(`/products/${id}`, {
      withCredentials: false,
    });
    console.log("getpublic", res.data.data);
    return res.data.data;
  };

  const getProductById = async (id) => {
    const res = await axios.get(`/products/getProductById/${id}`, {
      withCredentials: true,
    });
    return res.data.data;
  };

  const deleteProductById = async (id) => {
    try {
      const res = await axios.delete(`/products/${id}`);
      return { success: true, message: res?.data?.message };
    } catch (error) {
      return { success: false, message: error?.response?.data?.message };
    }
  };

  const getProductsBy20 = async (start) => {
    try {
      const res = await axios.get(
        `/products/productBy20?page=${start}`,
        {},
        { withCredentials: true }
      );
      console.log("by20", res.data.data);
      return {
        success: true,
        data: res.data.data.products,
        message: res?.message,
      };
    } catch (error) {
      return { success: false, message: error?.response?.data?.message };
    }
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
        deleteProductById,
        getProductsBy20,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 3. Create custom hook for easy access
export const useAuth = () => useContext(AuthContext);
