import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CgCloseO } from "react-icons/cg";
import { FaTrashAlt, FaPenAlt } from "react-icons/fa";
import useTypewriter from "./useTypeWriter";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { throttle } from "lodash";

// Debounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

const ProductList1 = () => {
  const { getProducts, deleteProductById, user } = useAuth();
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [visibleCount, setVisibleCount] = useState(20);
  const [showMore, setShowMore] = useState({});
  const [showMoreCategory, setShowMoreCategory] = useState({});

  const debouncedSearchKey = useDebounce(searchKey, 200);

  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res);
    setAllProducts(res);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const key = debouncedSearchKey.toLowerCase();
    if (!key.trim()) return allProducts;
    const searchWords = key.split(" ").filter(Boolean);
    return allProducts.filter((item) => {
      const name = item.name?.toLowerCase() || "";
      const price = String(item.price);
      const category = item.category?.toLowerCase() || "";
      return searchWords.every(
        (word) =>
          name.includes(word) || price.includes(word) || category.includes(word)
      );
    });
  }, [debouncedSearchKey, allProducts]);

  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const throttledScroll = useMemo(
    () =>
      throttle(() => {
        const bottom =
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100;
        if (bottom) {
          setVisibleCount((prev) =>
            Math.min(prev + 20, filteredProducts.length)
          );
        }
      }, 200),
    [filteredProducts.length]
  );

  useEffect(() => {
    window.addEventListener("scroll", throttledScroll);
    return () => {
      window.removeEventListener("scroll", throttledScroll);
      throttledScroll.cancel(); // important to clean up throttle
    };
  }, [throttledScroll]);

  const handleSearch = useCallback((e) => {
    setSearchKey(e.target.value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchKey("");
  }, []);

  const deleteProduct = useCallback(
    async (id) => {
      const res = await deleteProductById(id);
      if (res.success) {
        toast.success(res.message);
        setAllProducts((prev) => prev.filter((p) => p._id !== id));
      } else {
        toast.error(res.message);
      }
    },
    [deleteProductById]
  );

  const highlightRegex = useMemo(() => {
    const words = debouncedSearchKey.split(" ").filter(Boolean);
    return words.length ? new RegExp(`(${words.join("|")})`, "gi") : null;
  }, [debouncedSearchKey]);

  const highlightMatch = useCallback(
    (text) => {
      if (!highlightRegex) return text;
      const parts = text.split(highlightRegex);
      return parts.map((part, index) =>
        highlightRegex.test(part) ? (
          <span key={index} className="font-bold text-green-500">
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      );
    },
    [highlightRegex]
  );

  const words = [
    "Paneer😋",
    "Burger🍔",
    "Chowmein😋",
    "Momos🩵",
    "Thali🍽️",
    "Pizza🍕",
    "Briyani💖",
  ];
  const dynamicText = useTypewriter(words);

  return (
    <div className="mt-0 lg:mt-0 min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black sm:p-6 flex justify-center items-start">
      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-md border border-cyan-400/20 shadow-2xl p-3 sm:p-6 md:p-10 md:max-w-7xl animate-fade-in">
        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <div className="relative mt-20 lg:mt-4 md:mt-4  w-full max-w-md">
            <div className="absolute px-3 top-1/2 transform -translate-y-1/2 text-cyan-300 text-xl pointer-events-none animate-pulse">
              🔍
            </div>
            <input
              type="text"
              value={searchKey}
              placeholder={`Search For ${dynamicText}`}
              className="w-full px-5 py-3 text-left pl-11 rounded-full bg-black/30 text-cyan-100 placeholder-cyan-400 border border-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-500 shadow-[0_0_15px_#00ffff44] transition-all duration-300 ease-in-out backdrop-blur-md "
              onChange={handleSearch}
            />
            {searchKey && (
              <button
                onClick={clearSearch}
                className="absolute transition-transform hover:scale-125 duration-300 cursor-pointer right-1 px-3 top-1/2 transform -translate-y-1/2 text-cyan-300 text-xl"
              >
                <CgCloseO />
              </button>
            )}
          </div>
        </div>

        <h2 className="text-3xl mr-5 md:text-3xl sm:text-3xl font-bold text-cyan-300 mb-6 text-center">
          🍕{" "}
          {user?.shopName
            ?.split(" ")
            .map((w) => w[0].toUpperCase() + w.slice(1))
            .join(" ")}{" "}
          Food List
        </h2>

        {/* TABLE VIEW */}
        <div className="w-full hidden md:block">
          <table className="w-full text-sm sm:text-base text-cyan-100">
            <thead className="text-left uppercase text-cyan-400 border-b border-cyan-500/20">
              <tr>
                <th className="py-3 px-2 font-semibold w-[5%]">S.No</th>
                <th className="py-3 px-2 font-semibold w-[10%]">Preview</th>
                <th className="py-3 px-2 font-semibold w-[15%]">Dish Name</th>
                <th className="py-3 px-2 font-semibold w-[10%]">Price</th>
                <th className="py-3 px-2 font-semibold w-[20%]">Category</th>
                <th className="py-3 px-2 font-semibold w-[25%]">Description</th>
                <th className="py-3 px-2 font-semibold w-[15%]">Operation</th>
              </tr>
            </thead>
            <tbody>
              {visibleProducts.length > 0 ? (
                visibleProducts.map((item, index) => (
                  <tr
                    key={item._id}
                    className="hover:bg-white/10 border-b border-white/10 transition-all"
                  >
                    <td className="py-2 px-2">{index + 1}</td>
                    <td>
                      <img
                        className="h-14 w-14 object-cover rounded-lg ml-2 mb-1 mt-1"
                        src={item.productPic}
                        alt=""
                      />
                    </td>
                    <td className="px-2">
                      {highlightMatch(item.name, debouncedSearchKey)}
                    </td>
                    <td className="px-2">
                      {highlightMatch(String(item.price), debouncedSearchKey)}
                    </td>

                    {/* CATEGORY */}
                    <td className="px-2">
                      {/* <p className="font-semibold text-cyan-400">Category:</p> */}
                      <p
                        className={
                          showMoreCategory[index]
                            ? ""
                            : "line-clamp-2 overflow-hidden"
                        }
                      >
                        {highlightMatch(item.category, debouncedSearchKey)}
                      </p>
                      {item.category?.length > 40 && (
                        <button
                          className="text-xs text-cyan-400 mt-1 hover:underline"
                          onClick={() =>
                            setShowMoreCategory((prev) => ({
                              ...prev,
                              [index]: !prev[index],
                            }))
                          }
                        >
                          {showMoreCategory[index] ? "Show less" : "Read more"}
                        </button>
                      )}
                    </td>

                    {/* DESCRIPTION */}
                    <td className="px-2">
                      <p
                        className={
                          showMore[index] ? "" : "line-clamp-2 overflow-hidden"
                        }
                      >
                        {item.description}
                      </p>
                      {item.description?.length > 90 && (
                        <button
                          className="text-xs text-cyan-400 mt-1 hover:underline"
                          onClick={() =>
                            setShowMore((prev) => ({
                              ...prev,
                              [index]: !prev[index],
                            }))
                          }
                        >
                          {showMore[index] ? "Show less" : "Read more"}
                        </button>
                      )}
                    </td>

                    {/* OPERATIONS */}
                    <td className="px-2 py-1">
                      <div className="flex gap-2">
                        <button
                          onClick={() => deleteProduct(item._id)}
                          className="flex items-center bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-full text-sm"
                        >
                          <FaTrashAlt className="mr-1" /> Delete
                        </button>
                        <Link
                          to={`/update/${item._id}`}
                          className="flex animate-pulse items-center text-cyan-300 border border-cyan-400 px-3 py-2 rounded-full text-sm hover:bg-cyan-500 hover:text-white"
                        >
                          <FaPenAlt className="mr-1 text-white" /> Update
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-cyan-200">
                    No Products Found..😞
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* CARD VIEW */}
        <div className="md:hidden space-y-4">
          {visibleProducts.length === 0 ? (
            <div className="text-center text-cyan-300 font-medium text-sm">
              No Products Found..😞
            </div>
          ) : (
            visibleProducts.map((item, index) => (
              <div
                key={item._id}
                className="bg-[#202636] border border-cyan-700/30 rounded-xl p-4 shadow-md text-cyan-100 transition-all duration-300"
              >
                <p className="text-cyan-400 text-xs mb-1">❤ {index + 1}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-36">
                    <img
                      src={item.productPic}
                      alt="Product"
                      className="w-full h-32 object-contain rounded-lg shadow-[0_0_15px_#00FFFF66]"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-cyan-300 mb-2">
                      {highlightMatch(
                        item.name
                          .split(" ")
                          .map((w) => w[0].toUpperCase() + w.slice(1))
                          .join(" "),
                        debouncedSearchKey
                      )}
                    </h3>
                    {/* PRICE */}
                    <div className="font-semibold mt-3 -mb-0.5">
                      <span className="text-cyan-400">Price: ₹</span>{" "}
                      {highlightMatch(String(item.price), debouncedSearchKey)}
                    </div>

                    {/* CATEGORY */}
                    <p
                      className={
                        showMoreCategory[index]
                          ? "mt-1"
                          : " -mb-0.5 line-clamp-2 overflow-hidden"
                      }
                    >
                      <span className="font-semibold text-cyan-400">
                        Category:{" "}
                      </span>
                      {highlightMatch(item.category, debouncedSearchKey)}
                    </p>
                    {item.category?.length > 40 && (
                      <button
                        className="text-xs text-cyan-400 mt-1 hover:underline"
                        onClick={() =>
                          setShowMoreCategory((prev) => ({
                            ...prev,
                            [index]: !prev[index],
                          }))
                        }
                      >
                        {showMoreCategory[index] ? "Show less" : "Read more"}
                      </button>
                    )}

                    {/* DESCRIPTION */}
                    <p
                      className={
                        showMore[index]
                          ? "mt-1"
                          : "-mb-0.5 line-clamp-2 overflow-hidden"
                      }
                    >
                      <span className="font-semibold text-cyan-400">
                        Description:{" "}
                      </span>
                      {item.description}
                    </p>
                    {item.description?.length > 90 && (
                      <button
                        className="text-xs  text-cyan-400 mt-1 hover:underline"
                        onClick={() =>
                          setShowMore((prev) => ({
                            ...prev,
                            [index]: !prev[index],
                          }))
                        }
                      >
                        {showMore[index] ? "Show less" : "Read more"}
                      </button>
                    )}

                    <div className="flex flex-col sm:flex-row gap-2 mt-3">
                      <button
                        onClick={() => deleteProduct(item._id)}
                        className="flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-full text-xs"
                      >
                        <FaTrashAlt className="mr-1" /> Delete
                      </button>
                      <Link
                        to={`/update/${item._id}`}
                        className="flex items-center justify-center text-cyan-300 border border-cyan-400 px-4 py-2 rounded-full text-xs hover:bg-cyan-500 hover:text-white"
                      >
                        ✏ Update
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList1;
