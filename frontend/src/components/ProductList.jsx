import React, { useEffect, useState } from "react";

import {
  FaPenAlt,
  FaPencilAlt,
  FaPenFancy,
  FaPenNib,
  FaTrashAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { CgCloseO } from "react-icons/cg";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const ProductList = () => {
  const { user } = useAuth();
  const [product, setProduct] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searchkey, setsearchkey] = useState("");
  const [text, setText] = useState("");
  const [showMore, setShowMore] = useState({});
  const [showMoreCategory, setShowMoreCategory] = useState({});
  const { getProducts, deleteProductById } = useAuth();

  const deleteProduct = async (id) => {
    const res = await deleteProductById(id);
    if (!res.success) {
      toast.error(res?.message);
    } else {
      setProduct((prev) => prev.filter((p) => p._id !== id));
      setAllProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success(res?.message);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await getProducts();
      setProduct(res);
      setAllProducts(res);
    };
    fetch();
  }, [getProducts]);

  const handelSearch = (e) => {
    const key = e.target.value.toLowerCase();
    setsearchkey(key);
    setText(key);

    if (key.trim() === "") {
      setProduct(allProducts);
      return;
    }

    const searchWords = key.split(" ").filter(Boolean); // space se split and empty remove

    const filtered = allProducts.filter((item) => {
      const name = item.name.toLowerCase();
      const price = String(item.price);

      return searchWords.every(
        (word) => name.includes(word) || price.includes(word)
      );
    });

    setProduct(filtered);
  };

  const highlightMatch = (text, key) => {
    if (!key) return text;

    const words = key.split(" ").filter(Boolean);
    if (words.length === 0) return text;

    const regex = new RegExp(`(${words.join("|")})`, "gi");

    return text.replace(
      regex,
      (match) => `<span class="font-bold text-[#24e024]">${match}</span>`
    );
  };

  const handelMSGdelete = () => {
    setText("");
    setsearchkey("");
    setProduct(allProducts);
  };

  const toggleShowMore = (id) => {
    setShowMore((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleShowMoreCategory = (id) => {
    setShowMoreCategory((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const [dynamicPlaceholder, setDynamicPlaceholder] = useState(" ");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const words = [
    "Paneer😋",
    "Burger🍔",
    "Chowmein😋",
    "Momos🩵",
    "Thali🍽️",
    "Pizza🍕",
    "Briyani💖",
  ];

  useEffect(() => {
    const currentWord = words[wordIndex];
    const timeout = setTimeout(() => {
      if (charIndex <= currentWord.length) {
        setDynamicPlaceholder(currentWord.slice(0, charIndex));
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => {
          setCharIndex(0);
          setWordIndex((prev) => (prev + 1) % words.length);
        }, 1000);
      }
    }, 150);

    return () => clearTimeout(timeout);
  }, [charIndex, wordIndex]);

  return (
    <div className=" min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black sm:p-6 flex justify-center items-start">
      <div className="w-full my-14 max-w-6xl bg-white/10 backdrop-blur-md border border-cyan-400/20 shadow-2xl p-3 sm:p-6 animate-fade-in">
        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <div className="relative lg:mt-0 mt-11 md:mt-0 sm:mt-0 w-full max-w-md">
            <div className="absolute left- px-3 top-1/2 transform -translate-y-1/2 text-cyan-300 text-xl pointer-events-none animate-pulse">
              🔍
            </div>
            <input
              type="text"
              value={text}
              placeholder={`Search for ${dynamicPlaceholder}`}
              className="w-full px-5 py-3 text-left pl-11 rounded-full bg-black/30 text-cyan-100 placeholder-cyan-400 border border-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 shadow-[0_0_15px_#00ffff44] transition-all duration-300 ease-in-out backdrop-blur-md"
              onChange={handelSearch}
            />
            {text && (
              <button
                onClick={handelMSGdelete}
                className="absolute transition-transform hover:scale-125 duration-300 cursor-pointer right-1 px-3 top-1/2 transform -translate-y-1/2 text-cyan-300 text-xl"
              >
                <CgCloseO />
              </button>
            )}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl pr-5 sm:text-3xl font- text-cyan-300 mb-6 text-center">
          🍕{" "}
          {user?.shopName
            ?.split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}{" "}
          Food List
        </h2>

        {/* TABLE VIEW - Large Screen */}
        <div className="overflow-x-auto hidden md:block">
          <table className="w-full  text-sm sm:text-base text-cyan-100">
            <thead className="text-left   uppercase text-cyan-400 border-b border-cyan-500/20">
              <tr>
                <th className="py-3 px-2 font-semibold ">S.No</th>
                <th className="py-3 px-2 font-semibold">Preview</th>
                <th className="py-3 px-2 font-semibold w-[200px]">Dish Name</th>
                <th className="py-3 px-2 font-semibold">Price</th>
                <th className="py-3 px-2 font-semibold w-[200px]">Category</th>
                <th className="py-3 px-2 font-semibold w-[200px]">
                  Description
                </th>
                <th className="py-3 px-2 font-semibold">Operation</th>
              </tr>
            </thead>
            <tbody>
              {product && product.length > 0 ? (
                product.map((item, index) => (
                  <tr
                    key={index}
                    className=" hover:bg-white/10 border-b border-white/10 transition-all"
                  >
                    <td className="py-2 px-2">{index + 1}</td>
                    <td>
                      <img
                        className="h-14 w-14 object-cover rounded-lg ml-2 mb-1 mt-1"
                        src={item.productPic}
                        alt=""
                      />
                    </td>
                    <td
                      className="px-2"
                      dangerouslySetInnerHTML={{
                        __html: highlightMatch(
                          item.name
                            ?.split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" "),
                          searchkey
                        ),
                      }}
                    />
                    <td
                      className="px-2"
                      dangerouslySetInnerHTML={{
                        __html: highlightMatch(String(item.price), searchkey),
                      }}
                    />
                    {/* Category */}
                    <td className="px-2 w-[200px] break-words">
                      <div>
                        <p
                          className={`   ${
                            showMoreCategory[index]
                              ? ""
                              : "line-clamp-2 overflow-hidden"
                          } transition-all duration-300`}
                          dangerouslySetInnerHTML={{
                            __html: highlightMatch(item.category, searchkey),
                          }}
                        />
                        {item.category.length > 40 && (
                          <button
                            className="text-xs text-cyan-400 mt-1 hover:underline focus:outline-none"
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

                    {/* Description with Read More */}
                    <td className="px-2 w-[200px] break-words">
                      <div>
                        <p
                          className={` ${
                            showMore[index]
                              ? ""
                              : "line-clamp-2 overflow-hidden"
                          } transition-all duration-300`}
                          dangerouslySetInnerHTML={{
                            __html: highlightMatch(item.description, searchkey),
                          }}
                        />
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

                    <td className="px-2 py-1">
                      <div className="flex flex-col md:flex-row gap-2">
                        <button
                          onClick={() => deleteProduct(item._id)}
                          className="flex items-center bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-full text-sm"
                        >
                          <FaTrashAlt className="mr-1" /> Delete
                        </button>
                        <Link
                          to={`/update/${item._id}`}
                          className="flex items-center text-cyan-300 border border-cyan-400 px-3 py-2 rounded-full text-sm hover:bg-cyan-500 hover:text-white animate-pulse"
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

        {/* CARD VIEW - Small Screens (unchanged) */}
        <div className="md:hidden space-y-4">
          {product.length === 0 ? (
            <div className="text-center text-cyan-300 font-normal text-sm">
              No Products Found..😞
            </div>
          ) : (
            product.map((item, index) => {
              const desc = item.description || "";
              const cat = item.category || "";
              const descShort = desc.slice(0, 60);
              const catShort = cat.slice(0, 40);
              const isDescExpanded = showMore[item._id];
              const isCatExpanded = showMoreCategory[item._id];

              return (
                <div
                  key={index}
                  className="bg-[#202636] border border-cyan-700/30 rounded-xl p-4 py-5 shadow-md text-cyan-100 transition-all duration-300 overflow-hidden"
                >
                  <p className="text-cyan-400 text-xs sm:text-sm mb-1">
                    ❤ {index + 1}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 sm:items-start">
                    <div className="flex-shrink-0 w-full sm:w-36 md:w-40">
                      <img
                        src={item.productPic}
                        alt="Dish"
                        className="w-full h-32 sm:h-28 md:h-32 object-contain rounded-lg shadow-[0_0_15px_#00FFFF66] hover:shadow-[0_0_25px_#00FFFFAA] transition-all duration-300 ease-in-out animate-pulse"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-cyan-300 mb-2 leading-snug break-words whitespace-normal">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: highlightMatch(
                              item.name.charAt(0).toUpperCase() +
                                item.name.slice(1),
                              searchkey
                            ),
                          }}
                        />
                      </h3>

                      {/* Price */}
                      <p className="text-lg font-semibold flex flex-wrap items-start">
                        <span className="text-cyan-400 mr-1">Price:</span>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: highlightMatch(
                              `₹ ${item.price}`,
                              searchkey
                            ),
                          }}
                        />
                      </p>

                      {/* Category */}
                      {/* Category */}
                      <div className="text-base text-cyan-200  leading-relaxed">
                        <span className="inline-block w-[90px] text-cyan-400 font-semibold shrink-0">
                          Category:
                        </span>
                        <span className="inline break-words ">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: highlightMatch(
                                isCatExpanded || cat.length <= 40
                                  ? cat
                                  : catShort + ""
                              ),
                            }}
                          />
                          {cat.length > 40 && (
                            <button
                              className="text-cyan-400  hover:underline"
                              onClick={() => toggleShowMoreCategory(item._id)}
                            >
                              {isCatExpanded ? "Read less" : "...Read more"}
                            </button>
                          )}
                        </span>
                      </div>

                      {/* Description */}
                      <div className="text-base text-cyan-200 leading-relaxed">
                        <span className="inline-block w-[90px] text-cyan-400 font-semibold shrink-0">
                          Description:
                        </span>
                        <span className="inline break-words px-3 ">
                          <span
                            dangerouslySetInnerHTML={{
                              __html: highlightMatch(
                                isDescExpanded || desc.length <= 0
                                  ? desc
                                  : descShort + ""
                              ),
                            }}
                          />
                          {desc.length > 40 && (
                            <button
                              className="text-cyan-400  hover:underline"
                              onClick={() => toggleShowMore(item._id)}
                            >
                              {isDescExpanded ? "Read less" : "...Read more"}
                            </button>
                          )}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-2 mt-3">
                        <button
                          onClick={() => deleteProduct(item._id)}
                          className="flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-full text-xs sm:text-sm transition-all duration-300"
                        >
                          <FaTrashAlt className="mr-1" /> Delete
                        </button>

                        <Link
                          to={`/update/${item._id}`}
                          className="flex items-center justify-center text-cyan-300 border border-cyan-400 px-4 py-2 rounded-full text-xs sm:text-sm hover:bg-cyan-500 hover:text-white transition-all duration-300"
                        >
                          ✏ Update
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
