import React, { useState } from "react";
import LeftBar from "./productlistComponents/LeftBar";
import { Outlet, useLocation } from "react-router-dom";
import SearchBar from "./productlistComponents/SearchBar";

const OptimizeProductList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black  text-white overflow-hidden">
      <div className="flex h-full overflow-y-auto">
        <LeftBar />
        <div className="flex-1 overflow-y-auto p-4 no-scrollbar overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default OptimizeProductList;
