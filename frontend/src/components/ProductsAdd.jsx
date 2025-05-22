import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
const ProductsAdd = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    productPic: "",
  });

  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState(false);

  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState(false);
  const [imageError, setImageError] = useState("");

  const { addProduct } = useAuth();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
      setImageError("");
      setFormData((prev) => ({ ...prev, productPic: file }));
    } else {
      setPreviewImage(null);
      setFormData((prev) => ({ ...prev, productPic: "" }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "description" && value.length > 70) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const { name, price, category, description, productPic } = formData;

    // if (!name || !price || !category || !description || !productPic) {
    //   setError(true);
    //   setImageError(!productPic ? "Please upload an image." : "");
    //   return;
    // }
    if (description.length > 70) {
      toast.error("Description cannot exceed 70 characters.");
      return; // Stop submission
    }

    setLoading(true); // Show "Uploading..."

    const productData = new FormData();
    productData.append("name", name);
    productData.append("price", price);
    productData.append("category", category);
    productData.append("description", description);
    productData.append("productPic", productPic);

    const res = await addProduct(productData);
    console.log(res);

    if (!res.success) {
      toast.error(res?.message);
    } else {
      toast.success(res?.message);
    }
    // Reset form
    setFormData({
      name: "",
      price: "",
      category: "",
      description: "",
      productPic: "",
    });
    setPreviewImage(null);
    setError(false);
    setLoading(false);
  };
  useEffect(() => {
    if (!loading) {
      setDots("");
      return;
    }
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div className=" min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-black flex items-center justify-center px-4">
      <form
        onSubmit={handleAddProduct}
        className="mt-20 bg-white/10 backdrop-blur-md border border-cyan-500/30 p-8 mb-20 rounded-2xl shadow-[0_0_30px_#00ffff44] w-full max-w-lg space-y-4 animate-fade-in"
        encType="multipart/form-data"
      >
        <h2 className="text-3xl font-bold text-center text-cyan-300 ">
          😋Add Your Dish
        </h2>

        {/* Name */}
        <div>
          <label className="text-cyan-200 block mb-1">Your Dish Name 🍟</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-cyan-200/70 border border-cyan-400/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
            placeholder="Enter Dish Name"
          />
          {error && !formData.name && (
            <span className="text-red-500 text-sm">Enter a valid name</span>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="text-cyan-200 block mb-1">
            Your Dish Description 📝
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-cyan-200/70 border border-cyan-400/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
            placeholder="Enter Description"
          />
          <p className="text-xs text-cyan-300 mt-1">
            {formData.description.length} / 70 characters
          </p>
          {error && !formData.description && (
            <span className="text-red-500 text-sm">
              Enter a valid description
            </span>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="text-cyan-200 block mb-1">
            Your Dish Category ⭐
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-cyan-200/70 border border-cyan-400/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
            placeholder="Enter Category "
          />
          {error && !formData.category && (
            <span className="text-red-500 text-sm">Enter a valid category</span>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="text-cyan-200 block mb-1">Price 💰</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-cyan-200/70 border border-cyan-400/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
            placeholder="Enter Price"
          />
          {error && !formData.price && (
            <span className="text-red-500 text-sm">Enter a valid price</span>
          )}
        </div>

        <div>
          <label className="text-cyan-200 block mb-2 text-sm font-medium">
            📷 Upload Your Dish & Food Image
          </label>

          <div className="relative w-full border-2 border-dashed border-cyan-500/30 rounded-xl p-4 bg-white/5 hover:bg-white/10 transition">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              title="Upload one image"
            />
            <div className="text-center text-cyan-300">
              <p className="text-sm">Click or drag & drop to upload</p>
              <p className="text-xs text-cyan-500/70">JPG, PNG formats only</p>
            </div>
          </div>

          {error && !formData.productPic && (
            <span className="text-red-500 text-sm">upload a image</span>
          )}

          {previewImage && (
            <div className="mt-4">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-32 object-cover rounded-md border border-cyan-400/30 shadow"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white  py-2 rounded-md transition duration-300 shadow-md hover:shadow-xl"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              Uploading
              <span className="inline-block w-6 text-left">{dots}</span>
            </span>
          ) : (
            "Click to Upload"
          )}
        </button>
      </form>
    </div>
  );
};

export default ProductsAdd;
