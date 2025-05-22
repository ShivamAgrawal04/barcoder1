import React, { useState } from "react";
import LeftBar from "./productlistComponents/LeftBar";
import { Outlet, useLocation } from "react-router-dom";
import SearchBar from "./productlistComponents/SearchBar";

const OptimizeProductList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black  text-white overflow-hidden">
      <div className="flex h-screen overflow-y-auto">
        <LeftBar className="h-full overflow-hidden" />
        <div className="flex-1 overflow-y-auto p-4 no-scrollbar h-full overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default OptimizeProductList;
