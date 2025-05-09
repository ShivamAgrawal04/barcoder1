import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const ProductsAdd = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    productPic: "",
  });
  const [previewImages, setPreviewImages] = useState([]);
  const [error, setError] = useState(false);
  const [imageError, setImageError] = useState("");

  const { addProduct } = useAuth();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 5) {
      setImageError("❌ You can upload a maximum of 5 images.");
      return;
    }

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
    setImageError("");
    setFormData((prev) => ({ ...prev, productPic: files }));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const { name, price, category, description } = formData;

    if (!name || !price || !category || !description) {
      setError(true);
      return;
    }

    // Implement upload if needed here
    await addProduct(formData);

    setFormData({
      name: "",
      price: "",
      category: "",
      description: "",
      productPic: [],
    });
    setPreviewImages([]);
    setError(false);
    setImageError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-black flex items-center justify-center px-4">
      <form
        onSubmit={handleAddProduct}
        className="bg-white/10 backdrop-blur-md border border-cyan-500/30 p-8 mb-20 rounded-2xl shadow-[0_0_30px_#00ffff44] w-full max-w-lg space-y-6 animate-fade-in"
      >
        <h2 className="text-3xl font-bold text-center text-cyan-300 mb-4">
          🛒 Add Product
        </h2>

        {/* Name */}
        <div>
          <label className="text-cyan-200 block mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-cyan-200/70 border border-cyan-400/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
            placeholder="Enter product name"
          />
          {error && !formData.name && (
            <span className="text-red-500 text-sm">Enter the valid name</span>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="text-cyan-200 block mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-cyan-200/70 border border-cyan-400/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
            placeholder="Enter price"
          />
          {error && !formData.price && (
            <span className="text-red-500 text-sm">Enter the valid price</span>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="text-cyan-200 block mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-cyan-200/70 border border-cyan-400/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
            placeholder="e.g., Electronics, Clothing"
          />
          {error && !formData.category && (
            <span className="text-red-500 text-sm">
              Enter the valid category
            </span>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="text-cyan-200 block mb-1">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-cyan-200/70 border border-cyan-400/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
            placeholder="Enter description"
          />
          {error && !formData.description && (
            <span className="text-red-500 text-sm">
              Enter the valid description
            </span>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="text-cyan-200 block mb-2 text-sm font-medium">
            🖼️ Upload Product Images (Max 5)
          </label>

          <div className="relative w-full border-2 border-dashed border-cyan-500/30 rounded-xl p-4 bg-white/5 hover:bg-white/10 transition">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              title="Upload up to 5 images"
            />
            <div className="text-center text-cyan-300">
              <p className="text-sm">Click or drag & drop to upload</p>
              <p className="text-xs text-cyan-500/70">JPG, PNG formats only</p>
            </div>
          </div>

          {imageError && (
            <p className="text-red-400 mt-2 text-sm">{imageError}</p>
          )}

          <div className="grid grid-cols-3 gap-3 mt-4">
            {previewImages.map((img, i) => (
              <div
                key={i}
                className="relative group overflow-hidden rounded-lg border border-cyan-500/20 shadow"
              >
                <img
                  src={img}
                  alt={`preview-${i}`}
                  className="object-cover h-24 w-full transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition">
                  Preview {i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded-md transition duration-300 shadow-md hover:shadow-xl relative overflow-hidden group"
        >
          <span className="z-10 relative">➕ Add Product</span>
          <span className="absolute inset-0 bg-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity rounded-md" />
        </button>
      </form>
    </div>
  );
};

export default ProductsAdd;
