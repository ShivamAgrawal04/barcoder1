import { NavLink, useNavigate } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { FaProductHunt } from "react-icons/fa";
import Logo from "../../assets/Anurag.png";
import { ImExit } from "react-icons/im";
import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdQrCode2 } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";

import { toast } from "react-toastify";

const LeftBar = () => {
  const { logout } = useAuth();

  const logoutHandler = async () => {
    const res = await logout();
    if (res.success) {
      toast.success(res.message);
      navigate("/login");
    } else {
      toast.error(res.message);
    }
  };
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const menuItems = [
    // { icon: <MdSpaceDashboard />, label: "Dashboard", path: "/" },
    { icon: <FaProductHunt />, label: "All Products", path: "/list" },
    { icon: <IoMdAddCircle />, label: "Add Product", path: "/add" },
    { icon: <MdQrCode2 />, label: "Qr Code", path: "/qrcode" },
    { icon: <CgProfile />, label: "Profile", path: "/profile" },
  ];

  return (
    <div
      className={`h-screen px-3 pb-2 text-white transition-all duration-300 ${
        isCollapsed ? "w-[4.5rem]" : "w-64"
      } overflow-hidden flex flex-col justify-between
    bg-none backdrop-blur-xl border border-white/20 rounded-xl shadow-xl`}
    >
      {/* Header with Logo and Toggle Button */}
      <div className="flex items-center justify-center py-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <img
              className={`rounded-full transition-all duration-300 ${
                isCollapsed ? "w-8" : "w-14"
              }`}
              src={Logo}
              alt="Logo"
            />
            {!isCollapsed && (
              <h1
                className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 text-xl font-semibold cursor-pointer"
                onClick={() => navigate("/")}
              >
                Anurag Code's
              </h1>
            )}
          </div>
        )}
        <button
          className="text-white text-xl p-2 focus:outline-none"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col h-full justify-between">
        <div className="flex flex-col gap-3">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              end
              className={({ isActive }) =>
                `relative overflow-hidden rounded-full group transition-all duration-300 ease-in-out cursor-pointer ${
                  isActive
                    ? "ring-2 ring-cyan-400 bg-black shadow-[0_0_15px_#00ffff44]"
                    : "bg-black"
                }`
              }
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-l from-cyan-500 to-blue-500 opacity-25 transform scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-300 ease-out z-0" />
              <div className="relative z-10 flex items-center gap-3 px-4 py-3 text-white transition-transform duration-200 ease-out group-hover:translate-x-1">
                {item.icon}
                {!isCollapsed && <span>{item.label}</span>}
              </div>
            </NavLink>
          ))}
        </div>

        {/* Logout Button */}
        <NavLink
          onClick={logoutHandler}
          className={({ isActive }) =>
            `relative overflow-hidden rounded-full group transition-all duration-300 ease-in-out cursor-pointer ${
              isActive
                ? "ring-2 ring-cyan-400 bg-black shadow-[0_0_15px_#00ffff44]"
                : "bg-black"
            }`
          }
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-l from-cyan-500 to-blue-500 opacity-25 transform scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-300 ease-out z-0" />
          <div className="relative z-10 flex items-center gap-3 px-4 py-3 text-white transition-transform duration-200 ease-out group-hover:translate-x-1">
            <ImExit />
            {!isCollapsed && <span>Logout</span>}
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default LeftBar;
