// Updated UpdateProduct.jsx
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

  const handleUpdate = async () => {
    const data = new FormData();
    setLoading(true);
    const changedFields = Object.keys(formData).filter(
      (key) => formData[key] !== initialValues.current[key]
    );

    if (changedFields.length === 0) {
      toast.info("No fields have been changed.");
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
      navigate("/");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#0f172a] to-[#1e293b] px-4 py-10">
      <div className="w-full max-w-4xl bg-[#1e293b] text-white rounded-3xl shadow-xl border border-cyan-400/30 flex overflow-hidden">
        {/* Left Panel */}
        <div className="w-1/2 bg-cyan-400/10 p-6 flex flex-col justify-between border-r border-cyan-400/20">
          <div>
            <h2 className="text-3xl font-bold text-cyan-300 mb-2">
              🖼️ Product Image
            </h2>
            <p className="text-cyan-100 text-sm">
              Update your product image below.
            </p>
          </div>
          <div className="mt-4 flex flex-col items-center">
            <div className="relative w-full rounded-xl overflow-hidden group">
              {previewImage || formData.productPic ? (
                <img
                  src={previewImage || formData.productPic}
                  alt="Product Preview"
                  className="rounded-xl w-full max-h-[300px] object-contain"
                />
              ) : (
                <div className="text-center text-cyan-300 py-16">
                  No image available
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="text-white bg-cyan-500 px-4 py-2 rounded-lg font-semibold hover:bg-cyan-600"
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

        {/* Right Panel */}
        <div className="w-1/2 p-6 space-y-6">
          {[
            { icon: <FaBox />, name: "name", placeholder: "Product Name" },
            { icon: <FaDollarSign />, name: "price", placeholder: "Price" },
            { icon: <FaTags />, name: "category", placeholder: "Category" },
            {
              icon: <FaBuilding />,
              name: "description",
              placeholder: "Description",
            },
          ].map(({ icon, name, placeholder }) => (
            <div className="flex items-center space-x-3" key={name}>
              <span className="text-cyan-300">{icon}</span>
              <input
                name={name}
                type="text"
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleInputChange}
                className="w-full bg-transparent border-b border-cyan-300 placeholder-cyan-200 focus:outline-none py-2"
              />
            </div>
          ))}

          {/* <button
            onClick={handleUpdate}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 rounded-lg shadow-lg hover:shadow-cyan-500/30"
          >
            💾 Update Product
          </button> */}
          <button
            type="submit"
            onClick={handleUpdate}
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded-md transition duration-300 shadow-md hover:shadow-xl"
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
      </div>
    </div>
  );
};

export default UpdateProduct;
