import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const ProductOnly = () => {
  const { id } = useParams(); // shopId
  const [products, setProducts] = useState([]);

  console.log("📦 Fetched Shop ID from URL:", id);

  const socket = io(import.meta.env.VITE_API_BASE_URL, {
    withCredentials: true,
    autoConnect: false,
    query: {
      shopId: id,
    },
  });

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/products/${id}`
      );
      const data = await response.json();
      console.log("🛒 Products from API:", data);
      setProducts(data.data);
    } catch (error) {
      console.error("❌ Failed to fetch products:", error);
    }
  };

  // ✅ useEffect में socket और API कॉल
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("🟢 Socket Connected:", socket.id);
      socket.emit("join-room", id); // Room join karo
    });

    socket.on("connect_error", (err) => {
      console.error("🔴 Socket Connection Error:", err.message);
    });

    fetchProducts();

    const handleMenuUpdate = ({ action, updateProduct }) => {
      console.log("📡 Real-time Update Received:", action, updateProduct);

      setProducts((prev) => {
        if (action === "add") {
          console.log("add", updateProduct);
          return [...prev, updateProduct];
        }
        if (action === "update")
          return prev.map((p) =>
            p._id === updateProduct._id ? updateProduct : p
          );
        if (action === "delete") {
          console.log("❌ Delete UpdateProduct _id:", updateProduct?._id);
          return prev.filter((p) => p._id !== updateProduct._id);
        }

        return prev;
      });
    };

    socket.on("menuUpdated", handleMenuUpdate);

    return () => {
      socket.off("menuUpdated", handleMenuUpdate);
      socket.disconnect();
    };
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold mb-5 text-center text-cyan-700">
        Available Products
      </h1>
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item) => (
            <div key={item._id} className="bg-white p-5 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
              <p className="text-gray-600 mb-1">Price: ₹{item.price}</p>
              <p className="text-gray-600 mb-1">Category: {item.category}</p>
              <p className="text-gray-600 mb-1">
                Available: {item.availability ? "Yes" : "No"}
              </p>
              <p className="text-gray-600">Description: {item.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products available here</p>
      )}
    </div>
  );
};

export default ProductOnly;
