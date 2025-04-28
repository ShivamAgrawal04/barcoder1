import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("users");
    if (auth) {
      navigate("/");
    }
  }, []);
  const handelSubmit = async () => {
    console.log(name, email, password);
    let result = await fetch("http://localhost:5000/signup", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "content-type": "application/json",
      },
    });
    const resdata = await result.json();
    localStorage.setItem("users", JSON.stringify(resdata.result));
    localStorage.setItem("token", JSON.stringify(resdata.auth));
    console.log(resdata);

    if (resdata) {
      navigate("/");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 to-pink-200 p-4">
      <form className="backdrop-blur-xl bg-white/30 border border-white/40 shadow-2xl -mt-40 lg:-mt-24 rounded-2xl p-10 max-w-md w-full transition-all duration-300 hover:scale-105">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-900 drop-shadow">
          Sign In to Continue 🚀
        </h2>

        {/* Name Field */}
        <div className="mb-6">
          <label className="block text-blue-800 font-semibold mb-2">Name</label>
          <input
            type="text"
            name="name"
            className=" w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white bg-blue-50"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email Field */}
        <div className="mb-6">
          <label className="block text-blue-800 font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white bg-blue-50"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Field */}
        <div className="mb-8">
          <label className="block text-blue-800 font-semibold mb-2">
            Password
          </label>
          <input
            type=""
            name="password"
            className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white bg-blue-50"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        
        <button
          type="button"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold text-lg transition duration-300 shadow-md hover:shadow-xl"
          onClick={handelSubmit}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default SignUp;
