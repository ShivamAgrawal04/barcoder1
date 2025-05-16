import React, { useEffect, useState } from "react";
import { FaPenAlt, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CgCloseO } from "react-icons/cg";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import useTypewriter from "./useTypeWriter";

const ProductList = () => {
  const { user, getProducts, deleteProductById } = useAuth();
  const [product, setProduct] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searchKey, setsearchKey] = useState("");
  const [debouncedKey, setDebouncedKey] = useState("");
  const [visibleCount, setVisibleCount] = useState(20);
  const [showMore, setShowMore] = useState({});
  const [showMoreCategory, setShowMoreCategory] = useState({});

  // Delete product
  const deleteProduct = async (id) => {
    const res = await deleteProductById(id);
    if (!res.success) {
      toast.error(res?.message);
    } else {
      const updated = allProducts.filter((p) => p._id !== id);
      setAllProducts(updated);
      setProduct(updated.slice(0, visibleCount));
      toast.success(res?.message);
    }
  };

  // Fetch products on mount
  useEffect(() => {
    const fetch = async () => {
      const res = await getProducts();
      setAllProducts(res);
      setProduct(res.slice(0, 20));
    };
    fetch();
  }, [getProducts]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (bottom && visibleCount < allProducts.length && !debouncedKey) {
        setVisibleCount((prev) => prev + 20);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleCount, allProducts, debouncedKey]);

  // Display updated product list on scroll
  useEffect(() => {
    if (!debouncedKey) {
      setProduct(allProducts.slice(0, visibleCount));
    }
  }, [visibleCount, allProducts, debouncedKey]);

  // Debounce search key
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKey(searchKey);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchKey]);

  // Filter products based on search
  useEffect(() => {
    if (!debouncedKey.trim()) {
      setProduct(allProducts.slice(0, 20));
      setVisibleCount(20);
      return;
    }

    const key = debouncedKey.toLowerCase();
    const filtered = allProducts.filter((item) => {
      const nameMatch = item.name.toLowerCase().includes(key);
      const priceMatch = String(item.price).includes(key);
      // const categoryMatch = item.category?.toLowerCase().includes(key);
      // const descriptionMatch = item.description?.toLowerCase().includes(key);

      return nameMatch || priceMatch;
    });

    setProduct(filtered);
    setVisibleCount(filtered.length);
  }, [debouncedKey, allProducts]);

  // Search input handler
  const handleSearch = (e) => {
    setsearchKey(e.target.value);
  };

  // Clear search
  const handleClearSearch = () => {
    setsearchKey("");
    setVisibleCount(20);
    setProduct(allProducts.slice(0, 20));
  };

  // Highlight matches
  const highlightMatch = (text, key) => {
    if (!key) return <>{text}</>;

    const lowerText = text.toLowerCase();
    const lowerKey = key.toLowerCase();
    const startIndex = lowerText.indexOf(lowerKey);

    if (startIndex === -1) return <>{text}</>;

    const beforeMatch = text.slice(0, startIndex);
    const match = text.slice(startIndex, startIndex + key.length);
    const afterMatch = text.slice(startIndex + key.length);

    return (
      <>
        {beforeMatch}
        <span className="font-bold text-green-600">{match}</span>
        {afterMatch}
      </>
    );
  };
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
  // Description and Category collapsible components
  const Description = ({
    text,
    index,
    showMore,
    setShowMore,
    searchKey,
    highlightMatch,
  }) => {
    const limit = 90;
    const isLong = text.length > limit;
    const showFull = showMore[index];
    const displayText = showFull ? text : text.slice(0, limit);

    return (
      <div className="text-sm text-cyan-200 mt-0.5">
        <p className="break-words whitespace-pre-wrap inline">
          <span className="font-medium text-cyan-400 mr-1">Description:</span>
          {highlightMatch
            ? highlightMatch(displayText, searchKey)
            : displayText}
          {!showFull && isLong && "... "}
          {isLong && (
            <span
              onClick={() =>
                setShowMore((prev) => ({
                  ...prev,
                  [index]: !prev[index],
                }))
              }
              className="text-cyan-400 underline cursor-pointer text-xs ml-1"
            >
              {showFull ? "Show less" : "Read more"}
            </span>
          )}
        </p>
      </div>
    );
  };

  const Category = ({
    text,
    index,
    showMoreCategory,
    setShowMoreCategory,
    searchKey,
    highlightMatch,
  }) => {
    const limit = 90;
    const isLong = text.length > limit;
    const showFull = showMoreCategory[index];
    const displayText = showFull ? text : text.slice(0, limit);

    return (
      <div className="text-sm text-cyan-200 mt-0.5">
        <p className="break-words whitespace-pre-wrap inline">
          <span className="font-medium text-cyan-400 mr-1">Category:</span>
          {highlightMatch
            ? highlightMatch(displayText, searchKey)
            : displayText}
          {!showFull && isLong && "... "}
          {isLong && (
            <span
              onClick={() =>
                setShowMoreCategory((prev) => ({
                  ...prev,
                  [index]: !prev[index],
                }))
              }
              className="text-cyan-400 underline cursor-pointer text-xs ml-1"
            >
              {showFull ? "Show less" : "Read more"}
            </span>
          )}
        </p>
      </div>
    );
  };

  return (
    <div className="mt-0 lg:mt-0 min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black sm:p-6 flex justify-center items-start">
      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-md border border-cyan-400/20 shadow-2xl p-3 sm:p-6 md:p-10 md:max-w-7xl animate-fade-in">
        <div className="mb-6 flex justify-center">
          <div className="relative mt-20 lg:mt-4 md:mt-4  w-full max-w-md">
            <div className="absolute left- px-3 top-1/2 transform -translate-y-1/2 text-cyan-300 text-xl pointer-events-none animate-pulse">
              🔍
            </div>
            <input
              type="text"
              value={searchKey}
              placeholder={`Search For ${dynamicText}`}
              // className="w-full px-5 py-3 text-left pl-11 rounded-full bg-black/30 text-cyan-100 placeholder-cyan-400 border border-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 shadow-[0_0_15px_#00ffff44] transition-all duration-300 ease-in-out backdrop-blur-md animate-pulse"
              className="w-full px-5 py-3 text-left pl-11 rounded-full bg-black/30 text-cyan-100 placeholder-cyan-400 border border-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-cyan-500 shadow-[0_0_15px_#00ffff44] transition-all duration-300 ease-in-out backdrop-blur-md "
              onChange={handleSearch}
            />

            {searchKey && (
              <button
                onClick={handleClearSearch}
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
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
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
              {product && product.length > 0 ? (
                product.map((item, index) => (
                  <tr
                    key={index}
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
                    <td className="px-2 tracking-wide">
                      {highlightMatch(
                        item.name
                          ?.split(" ")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" "),
                        searchKey
                      )}
                    </td>
                    <td className="px-2 tracking-wide">
                      {highlightMatch(String(item.price), searchKey)}
                    </td>
                    <td className="px-2 tracking-wide">
                      <div>
                        <p
                          className={`${
                            showMoreCategory[index]
                              ? ""
                              : "line-clamp-2 overflow-hidden"
                          } transition-all duration-300`}
                        >
                          {highlightMatch(item.category)}
                        </p>
                        {item.category.length > 40 && (
                          <button
                            className="tracking-wide text-xs text-cyan-400 mt-1 hover:underline focus:outline-none"
                            onClick={() =>
                              setShowMoreCategory((prev) => ({
                                ...prev,
                                [index]: !prev[index],
                              }))
                            }
                          >
                            {showMoreCategory[index]
                              ? "Show less"
                              : "Read more"}
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-2">
                      <div>
                        <p
                          className={`${
                            showMore[index]
                              ? ""
                              : "line-clamp-2 overflow-hidden"
                          } transition-all duration-300`}
                        >
                          {highlightMatch(item.description)}
                        </p>
                        {item.description.length > 90 && (
                          <button
                            className="text-xs text-cyan-400 mt-1 hover:underline focus:outline-none"
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
                      </div>
                    </td>
                    <td className="px-2 py-1 ">
                      <div className="flex gap-2">
                        <button
                          onClick={() => deleteProduct(item._id)}
                          className="flex  items-center bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-full text-sm"
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
          {product.length === 0 ? (
            <div className="text-center text-cyan-300 font-medium text-sm">
              No Products Found..😞
            </div>
          ) : (
            product.map((item, index) => (
              <div
                key={index}
                className="bg-[#202636] border border-cyan-700/30 rounded-xl p-4 shadow-md text-cyan-100 transition-all duration-300"
              >
                <p className="text-cyan-400 text-xs mb-1">❤ {index + 1}</p>

                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Image */}
                  <div className="w-full sm:w-36">
                    <img
                      src={item.productPic}
                      alt="Product"
                      className="w-full h-32 object-contain rounded-lg shadow-[0_0_15px_#00FFFF66] hover:shadow-[0_0_25px_#00FFFFAA] transition-all duration-300"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    {/* Name */}
                    <h3 className="text-xl font-semibold text-cyan-300 mb-2 leading-snug break-words whitespace-normal">
                      {highlightMatch(
                        item.name
                          ?.split(" ")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" "),
                        searchKey
                      )}
                    </h3>

                    {/* Price */}
                    <div className="flex flex-wrap items-start text-base font-semibold mb-0.5">
                      <span className="text-cyan-400 mr-1">Price: ₹</span>
                      <span>
                        {highlightMatch(String(item.price), searchKey)}
                      </span>
                    </div>

                    {/* Category */}
                    <Category
                      text={item.category}
                      index={index}
                      showMoreCategory={showMoreCategory}
                      setShowMoreCategory={setShowMoreCategory}
                      searchKey={searchKey}
                      highlightMatch={highlightMatch}
                    />

                    {/* Description */}
                    <Description
                      text={item.description}
                      index={index}
                      showMore={showMore}
                      setShowMore={setShowMore}
                      searchKey={searchKey}
                      highlightMatch={highlightMatch}
                    />

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 mt-3">
                      <button
                        onClick={() => deleteProduct(item._id)}
                        className="flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-full text-xs transition-all duration-300"
                      >
                        <FaTrashAlt className="mr-1" /> Delete
                      </button>
                      <Link
                        to={`/update/${item._id}`}
                        className="flex items-center justify-center text-cyan-300 border border-cyan-400 px-4 py-2 rounded-full text-xs hover:bg-cyan-500 hover:text-white transition-all duration-300"
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

export default ProductList;
