import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const ProductsAdd = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  const { addProduct } = useAuth();

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!name || !price || !category || !description) {
      setError(true);
      return false;
    }
    await addProduct({ name, price, category, description });

    setName("");
    setPrice("");
    setCategory("");
    setDescription("");
    setError(false);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-black flex items-center justify-center px-4">
      <form
        className="bg-white/10 backdrop-blur-md border border-cyan-500/30 p-8 mb-20 rounded-2xl shadow-[0_0_30px_#00ffff44] w-full max-w-md space-y-6 animate-fade-in"
        // onSubmit={handleAddProduct}
      >
        <h2 className="text-3xl font-bold text-center text-cyan-300 mb-4">
          🛒 Add Product
        </h2>

        {/* Name */}
        <div>
          <label className="text-cyan-200 block mb-1">Product Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-cyan-200/70 border border-cyan-400/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {error && !name && (
          <span className="text-red-500">Enter the valid name </span>
        )}

        {/* Price */}
        <div>
          <label className="text-cyan-200 block mb-1">Price</label>
          <input
            type="number"
            className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-cyan-200/70 border border-cyan-400/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        {error && !price && (
          <span className="text-red-500">Enter the valid price </span>
        )}

        {/* Category */}
        <div>
          <label className="text-cyan-200 block mb-1">Category</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-cyan-200/70 border border-cyan-400/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
            placeholder="e.g., Electronics, Clothing"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        {error && !category && (
          <span className="text-red-500">Enter the valid category </span>
        )}

        {/* Company */}
        <div>
          <label className="text-cyan-200 block mb-1">description</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-cyan-200/70 border border-cyan-400/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
            placeholder="description "
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {error && !description && (
          <span className="text-red-500">Enter the valid company </span>
        )}

        {/* Add Product Button */}
        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded-md transition duration-300 shadow-md hover:shadow-xl relative overflow-hidden group"
          onClick={handleAddProduct}
        >
          <span className="z-10 relative">➕ Add Product</span>
          <span className="absolute inset-0 bg-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity rounded-md" />
        </button>
      </form>
    </div>
  );
};

export default ProductsAdd;
