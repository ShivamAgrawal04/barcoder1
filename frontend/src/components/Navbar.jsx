import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Anurag.png";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [searchBarPosition, setSearchBarPosition] = useState("top-16");
  const ClickRef = useRef();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const MenuItems = ({ isMobile = false }) => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-">
      <Link
        to="/"
        className={`px-2 py-1 rounded-md text-sm transition-colors duration-300
    ${
      location.pathname === "/"
        ? "bg-cyan-500 text-white"
        : "hover:bg-cyan-400 hover:text-white text-cyan-300"
    }`}
        onClick={() => isMobile && setMenuOpen(false)}
      >
        Product
      </Link>

      <Link
        to="/add"
        className={`px-2 py-1 rounded-md text-sm transition-all duration-300 ${
          location.pathname === "/add"
            ? "bg-cyan-500 text-white"
            : "hover:text-cyan-400"
        }`}
        onClick={() => isMobile && setMenuOpen(false)}
      >
        Add Product
      </Link>

      <Link
        to="/qrcode"
        className={`px-2 py-1 rounded-md text-sm transition-all duration-300 ${
          location.pathname === "/qrcode"
            ? "bg-cyan-500 text-white"
            : "hover:text-cyan-400"
        }`}
        onClick={() => isMobile && setMenuOpen(false)}
      >
        QRCode
      </Link>

      <Link
        to="/profile"
        className={`px-2 py-1 rounded-md text-sm transition-all duration-300 underline ${
          location.pathname === "/profile"
            ? "bg-cyan-500 text-green-600"
            : "text-red-500"
        }`}
      >
        Developers Support
      </Link>

      <Link
        to="#"
        className="w-10 h-10 bg-slate-50 text-black text-center rounded-full flex items-center justify-center transition-all duration-300 hover:text-cyan-400 border"
        onClick={toggle}
      >
        {getShortName()}
      </Link>
    </div>
  );

  useEffect(() => {
    const handelClick = (events) => {
      if (ClickRef.current && !ClickRef.current.contains(events.target)) {
        setMenu(false);
      }
    };
    document.addEventListener("mousedown", handelClick);
    return () => document.removeEventListener("mousedown", handelClick);
  }, []);

  const toggle = () => {
    setMenu(!menu);
  };

  const getShortName = () => {
    if (!user || !user.name) return "Profile";

    const nameParts = user.name.trim().split("");
    const firstLetter = nameParts[0]?.charAt(0).toUpperCase() || "";

    return `${firstLetter}`;
  };

  const clicklogo = () => {
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50  bg-gray-800 shadow-[0_0_20px_#00ffff44] font-neon">
      <div className="max-w-7xl mx-auto px-4 ">
        <div className=" flex justify-between items-center h-16">
          <div className=" items-center flex flex-row">
            <img
              className="w-14 h-14 mr-5 rounded-full object-contain animate-pulse hover:rotate-[360deg] transition-all duration-700"
              src={Logo}
              alt="Logo"
            />
            <h1
              onClick={clicklogo}
              className="cursor-pointer text-xl  sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 tracking-wider"
            >
              Anurag Code's
            </h1>
          </div>

          <div className="hidden md:flex space-x-6 text-white items-center text-lg">
            {user ? (
              <MenuItems />
            ) : (
              <>
                <Link to="/signup" className="hover:text-blue-500">
                  Sign Up
                </Link>
                <Link to="/login" className="hover:text-blue-500">
                  Login
                </Link>
              </>
            )}
          </div>

          <div
            className="md:hidden text-white text-3xl cursor-pointer transition-transform transform hover:scale-110"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <HiX /> : <HiMenuAlt3 />}
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden flex flex-col gap-4 text-white px-4 pb-4 transition-all duration-500 ease-in-out ${
            menuOpen
              ? "max-h-[500px] opacity-100 pt-4"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          {user ? (
            <MenuItems isMobile />
          ) : (
            <>
              <Link
                to="/signup"
                className="hover:text-blue-500"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="hover:text-blue-500"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
      {menu && (
        <div
          ref={ClickRef}
          className="absolute lg:right-4 lg:top-16 w-4/6 sm:w-56 bg-white text-gray-800 rounded-xl shadow-xl z-50 animate-scale-in origin-top-right transition-all duration-300"
        >
          <ul className="p-3 space-y-2">
            <li className="px-4 py-2 font-semibold text-gray-700 border-b border-gray-200 truncate">
              👤 {user.name}
            </li>
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  setMenu(false);
                }}
                className="w-full text-left px-4 py-2 bg-gradient-to-r from-red-400 to-pink-500 text-white rounded-md shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                🚪 Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
