import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaBox, FaDollarSign, FaTags, FaBuilding } from "react-icons/fa";
import Demovideo from "../assets/System.mp4";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    let result = await fetch(`http://localhost:5000/products/${params.id}`, {
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  const handelUpdate = async () => {
    let result = await fetch(`http://localhost:5000/products/${params.id}`, {
      method: "put",
      body: JSON.stringify({ name, price, company, category }),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });

    result = await result.json();
    console.log(result);
    navigate("/");
  };

  return (
    <div className="min-h-screen  flex items-center justify-center bg-gradient-to-tr from-[#0f172a] to-[#1e293b] px-4 py-10">
      <div className="w-full -mt-24 max-w-3xl bg-[#1e293b] text-white rounded-3xl shadow-xl border border-cyan-400/30 flex overflow-hidden">
        {/* Left panel */}
        <div className="w-1/2 bg-cyan-400/10 backdrop-blur-md p-8 flex flex-col justify-between border-r border-cyan-400/20">
          <div>
            <h2 className="text-3xl font-bold text-cyan-300 mb-2">
              🛠️ Edit Product
            </h2>
            <p className="text-cyan-100 text-sm">
              Update product information easily and save it to the database.
            </p>
          </div>
          <div className="w-full md:w-full mt-1 p-4 flex flex-col items-center justify-center bg-white/5 backdrop-blur-sm rounded-2xl border border-cyan-300/30 shadow-[0_0_20px_#00ffff22] transition-all hover:shadow-[0_0_30px_#00ffff66]">
            <h3 className="text-2xl text-cyan-300 font-bold mb-4 tracking-wide">
              📹 Update Preview
            </h3>
            <div className="relative rounded-3xl overflow-hidden group">
              <video
                src={Demovideo}
                autoPlay
                muted
                loop
                playsInline
                className="w-80 h-60 rounded-3xl shadow-lg transform transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-3xl border border-cyan-400/30 pointer-events-none group-hover:animate-pulse" />
            </div>
          </div>
        </div>

        {/* Right panel form */}
        <div className="w-1/2 p-8 space-y-5">
          {/* Name */}
          <div className="flex items-center space-x-3">
            <FaBox className="text-cyan-300" />
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border-b border-cyan-300 placeholder-cyan-200 focus:outline-none py-2"
            />
          </div>

          {/* Price */}
          <div className="flex items-center space-x-3">
            <FaDollarSign className="text-cyan-300" />
            <input
              type="text"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-transparent border-b border-cyan-300 placeholder-cyan-200 focus:outline-none py-2"
            />
          </div>

          {/* Category */}
          <div className="flex items-center space-x-3">
            <FaTags className="text-cyan-300" />
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-transparent border-b border-cyan-300 placeholder-cyan-200 focus:outline-none py-2"
            />
          </div>

          {/* Company */}
          <div className="flex items-center space-x-3">
            <FaBuilding className="text-cyan-300" />
            <input
              type="text"
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full bg-transparent border-b border-cyan-300 placeholder-cyan-200 focus:outline-none py-2"
            />
          </div>

          {/* Update Button */}
          <button
            onClick={handelUpdate}
            className="w-full mt-6 bg-cyan-500 hover:bg-cyan-600 transition-all text-white font-bold py-2 rounded-lg shadow-lg hover:shadow-cyan-500/30"
          >
            💾 Update Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
