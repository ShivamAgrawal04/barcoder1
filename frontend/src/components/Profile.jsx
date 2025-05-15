import React from "react";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const auth = JSON.parse(localStorage.getItem("users"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl text-center w-[90%] max-w-md">
        <h2 className="text-3xl font-bold text-cyan-300 mb-4">👤 Profile</h2>
        <p className="text-lg mb-2">
          <span className="font-semibold text-cyan-400">Name:</span> {auth.name}
        </p>
        <p className="text-lg mb-6">
          <span className="font-semibold text-cyan-400">Email:</span>{" "}
          {auth.email}
        </p>
        <button
          onClick={logout}
          className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all duration-300 shadow-lg"
        >
          🚪 Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
