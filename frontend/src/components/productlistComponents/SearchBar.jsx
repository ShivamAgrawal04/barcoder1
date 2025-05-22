import React from "react";
import useAnimatedPlaceholder from "./useAnimatedPlaceholder";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const words = [
  "Paneer 😋",
  "Burger 🍔",
  "Chowmein 😋",
  "Momos 🩵",
  "Thali 🍽️",
  "Pizza 🍕",
  "Briyani 💖",
];

const SearchBar = ({ products, onSearch, searchQuery, setSearchQuery }) => {
  const animatedPlaceholder = useAnimatedPlaceholder({ words });
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await logout();
    if (res.success) {
      toast.success(res.message);
      navigate("/login");
    } else {
      toast.error(res.message);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  return (
    <div className="flex items-center justify-between w-full mb-4">
      {/* Left: Title */}
      <h2 className="text-3xl font-semibold text-cyan-300 whitespace-nowrap">
        {user?.shopName
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </h2>

      {/* Right: Search Input */}
      <div className="flex w-full justify-end gap-4 items-center h-full">
        <div className="relative w-full max-w-xs">
          <input
            type="search"
            placeholder={searchQuery ? "" : "Search For " + animatedPlaceholder}
            value={searchQuery}
            onChange={handleChange}
            aria-label="Search products"
            className="w-full rounded-full bg-black/30 text-cyan-100 placeholder-cyan-400 border border-cyan-500/30
              px-5 py-2 pl-11
              focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-500
              shadow-[0_0_15px_#00ffff44]
              backdrop-blur-md
              caret-cyan-400"
            spellCheck="false"
            autoComplete="off"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 stroke-cyan-400 pointer-events-none"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full border pt-1 border-cyan-400 text-white bg-black">
              <h1 className="text-2xl font-normal">
                {user?.name.charAt(0).toUpperCase()}
              </h1>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 p-2 shadow"
          >
            <li>
              <a className="justify-between">{user?.name.toUpperCase()}</a>
            </li>
            <li>
              <button onClick={handleLogout} className="bg-red-400">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
