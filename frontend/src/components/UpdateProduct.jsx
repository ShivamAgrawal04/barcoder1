import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaBox, FaDollarSign, FaTags, FaBuilding } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    productPic: "",
  });

  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const { updateProduct, getProductById } = useAuth();

  const initialValues = useRef({});
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
      setFormData((prev) => ({ ...prev, productPic: file }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault(); // prevent default form submission behavior

    const data = new FormData();
    setLoading(true);
    const changedFields = Object.keys(formData).filter(
      (key) => formData[key] !== initialValues.current[key]
    );

    if (changedFields.length === 0) {
      toast.info("No fields have been changed.");
      setLoading(false); // ye bhi add karo
      return;
    }

    changedFields.forEach((key) => {
      data.append(key, formData[key]);
    });

    console.log("Sending only changed fields:", changedFields);

    const res = await updateProduct(id, data);
    if (!res?.success) {
      toast.error(res?.message);
    } else {
      toast.success(res?.message);
      navigate("/"); // navigate after successful update
    }
    setLoading(false);
  };

  const getDetails = async () => {
    const res = await getProductById(id);
    setFormData({
      name: res.name,
      price: res.price,
      category: res.category,
      description: res.description,
      productPic: res.productPic,
    });
    setPreviewImage(res.productPic);
    initialValues.current = res;
  };

  useEffect(() => {
    getDetails();
  }, []);

  useEffect(() => {
    if (!loading) return setDots("");
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 mt-14 lg:mt-0 md:mt-0 sm:mt-14 bg-gray-900">
      <form
        onSubmit={handleUpdate}
        className="w-full max-w-4xl bg-[#1e293b] text-white rounded-3xl shadow-xl border border-cyan-400/30 flex flex-col md:flex-row overflow-hidden"
      >
        {/* 🔵 Left Section - Image */}
        <div className="md:w-1/2 w-full bg-cyan-400/10 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-cyan-400/20">
          <div>
            <h2 className="text-3xl font-bold text-cyan-300 mb-2">
              📷 Your Dish Image
            </h2>
            <p className="text-cyan-100 text-sm">
              Update your Dish image below 👇
            </p>
          </div>
          <div className="mt-4 flex flex-col items-center">
            <div className="relative w-full rounded-xl overflow-hidden group">
              {previewImage || formData.productPic ? (
                <img
                  src={previewImage || formData.productPic}
                  alt="Product Preview"
                  className="rounded-xl lg:mb-5 md:mb-5 sm:mb-5 w-full max-h-[300px] object-contain"
                />
              ) : (
                <div className="text-center text-cyan-300 py-16">
                  No image available
                </div>
              )}
              <div className="absolute bottom-5 inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="text-white bg-cyan-500 px-4 py-2 rounded-lg hover:bg-cyan-600"
                >
                  Click to update image
                </button>
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              hidden
            />
          </div>
        </div>

        {/* 🟢 Right Section - Form */}
        <div className="md:w-1/2 w-full p-6 space-y-2">
          <div>
            <label className="block text-cyan-300 mb-1">Dish Name🍔</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-cyan-400/30 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-cyan-300 mb-1">Food Category 📄</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-cyan-400/30 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-cyan-300 mb-1">Description 📄</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-cyan-400/30 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-cyan-300 mb-1">Price 💰</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-cyan-400/30 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                Uploading
                <span className="inline-block w-6 text-left">{dots}</span>
              </span>
            ) : (
              "💾 Update Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
