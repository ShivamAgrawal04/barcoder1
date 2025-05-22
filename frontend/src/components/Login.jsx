import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { IoIosEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async () => {
    const res = await login({ email, password });
    console.log(res);
    if (!res.success) {
      toast.error(res?.message);
    } else {
      toast.success(res?.message || "✅ Login successfully");
      navigate("/list");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (email && password) {
        handleSubmit();
      } else {
        alert("Please fill both fields first");
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-black via-slate-900 to-gray-900">
      <div className="relative w-[90%] h-[400px] lg:mt-5 mb-20 lg:mb-0  max-w-md p-8 rounded-2xl backdrop-blur-lg bg-white/5 border border-cyan-500/30 shadow-[0_0_20px_#00ffff44] animate-float">
        <h2 className="themechange text-3xl font-bold mt-11 text-cyan-300 text-center mb-6 drop-shadow-md">
          🔐 Welcome Back
        </h2>

        {/* Input: Email */}
        <div className="mb-5 themechange ">
          <label className="text-sm text-cyan-200 block mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-cyan-200/70 border border-cyan-400/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
            placeholder="you@example.com 📧"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        {/* Input: Password */}
        <div className="mb-6 themechange relative">
          <label className="text-sm text-cyan-200 block mb-1">Password</label>
          <input
            type={isActive ? "text" : "password"}
            className="w-full px-4 py-2 rounded-md bg-white/10 text-white placeholder-cyan-200/70 border border-cyan-400/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
            placeholder="•••••••• 🔑"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {isActive}

          <div className="absolute top-[2.3rem] right-3 ">
            {isActive ? (
              <button onClick={() => setIsActive(!isActive)}>
                <IoMdEye className="-scale-150" />
              </button>
            ) : (
              <button onClick={() => setIsActive(!isActive)}>
                <IoIosEyeOff className="-scale-150" />
              </button>
            )}
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="relative w-full py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-md overflow-hidden transition-all duration-300 shadow-lg group"
        >
          <span className="z-10 relative">🚀 Login</span>
          <span className="absolute inset-0 bg-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity rounded-md" />
        </button>
      </div>
    </div>
  );
};

export default Login;
