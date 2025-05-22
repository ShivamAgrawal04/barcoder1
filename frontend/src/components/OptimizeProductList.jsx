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
        {/* <div className="bg-[#424b61] h-full w-[18.7rem] p-[1.2rem] pb-24 shrink-0"> */}
        <LeftBar />
        {/* </div> */}
        <div className="flex-1 overflow-y-auto p-4 no-scrollbar overflow-hidden">
          {/* <div className="pt-2">
            {location.pathname !== "/list" && <SearchBar />}
          </div> */}

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default OptimizeProductList;
