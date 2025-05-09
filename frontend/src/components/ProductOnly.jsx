import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { io } from "socket.io-client";
const socket = io("http://localhost:5000", {
  withCredentials: true,
  autoConnect: false,
  // query: {
  //   shopId: id, // `id` from URL which is shopUserId
  // },
});

const ProductOnly = () => {
  const [products, setProducts] = useState([]);

  const { id } = useParams();
  console.log(id);
  // const { getPublicProducts } = useAuth();

  const fetchProducts = async () => {
    const result = await fetch(`http://192.168.29.138:5000/api/products/${id}`);
    const data = await result.json();
    console.log(data.data);
    setProducts(data.data);
  };

  useEffect(() => {
    socket.connect();
    fetchProducts();

    const handleMenuUpdate = ({ action, product }) => {
      setProducts((prev) => {
        if (action === "add") return [...prev, product];
        if (action === "update")
          return prev.map((p) => (p._id === product._id ? product : p));
        if (action === "delete")
          return prev.filter((p) => p._id !== product._id);
        return prev;
      });
    };

    socket.on("menuUpdated", handleMenuUpdate);

    return () => {
      socket.off("menuUpdated", handleMenuUpdate);
      socket.disconnect();
    };
  }, [id]);

  // const fetchProducts = useCallback(async () => {
  //   try {
  //     const result = await getPublicProducts(id);
  //     setProducts(result); // Store the products in the state
  //   } catch (error) {
  //     console.error("Failed to fetch products", error); // Log any errors
  //   }
  // }, [id, getPublicProducts]);

  // useEffect(() => {
  //   fetchProducts();
  //   const intervalId = setInterval(() => {
  //     fetchProducts();
  //   }, 5000);
  //   return () => clearInterval(intervalId);
  // }, [fetchProducts]);

  // Fetch the products when the component mounts

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold mb-5 text-center text-cyan-700">
        Available Products
      </h1>

      {/* Check if there are products to display */}
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item) => (
            <div
              key={item._id}
              className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition"
            >
              {/* Display each product's details */}
              <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
              <p className="text-gray-600 mb-1">Price: ₹{item.price}</p>
              <p className="text-gray-600 mb-1">Category: {item.category}</p>
              <p className="text-gray-600">
                Availaible: {item.availability ? "True" : "false"}
              </p>
              <p className="text-gray-600">description: {item.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products available</p>
      )}
    </div>
  );
};

export default ProductOnly;
