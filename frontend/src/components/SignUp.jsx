import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    shopName: "",
  });

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const res = await signup(formData);
    if (!res.success) {
      toast.error(res?.message || "Signup failed");
    } else {
      toast.success(res?.message || "Signup successful");
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 to-pink-200 p-4">
      <form className="backdrop-blur-xl bg-white/30 border border-white/40 shadow-2xl -mt-24 lg:-mt-20 rounded-2xl p-10 max-w-md w-full transition-all duration-300 hover:scale-105">
        <h2 className="text-3xl font-extrabold mb-5 text-center text-blue-900 drop-shadow">
          Sign In to Continue 🚀
        </h2>

        <div className="mb-2">
          <label className="block text-blue-800 font-semibold mb-2">
            Restaurant/Cafe
          </label>
          <input
            type="text"
            name="shopName"
            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white bg-blue-50"
            placeholder="Your Reastrunt & Cafe 🍔"
            value={formData.shopName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label className="block text-blue-800 font-semibold mb-2">Name</label>
          <input
            type="text"
            name="name"
            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white bg-blue-50"
            placeholder="Your Name 🙎‍♂"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label className="block text-blue-800 font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white bg-blue-50"
            placeholder="your@gmail.com 📧"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label className="block text-blue-800 font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white bg-blue-50"
            placeholder="•••••••• 🔑"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button
          type="button"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold text-lg transition duration-300 shadow-md hover:shadow-xl"
          onClick={handleSubmit}
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignUp;
