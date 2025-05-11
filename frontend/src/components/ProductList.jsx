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
    setProduct(allProducts); // Full list ko restore kar dena jab search clear ho
    return;
  }

  const filtered = allProducts.filter((item) => {
    // Check if name or price starts with the key
    const nameMatch = item.name.toLowerCase().startsWith(key);
    const priceMatch = String(item.price).startsWith(key); // Price ko string mein convert karna agar wo number ho

    return nameMatch || priceMatch; // Agar name ya price match kare
  });

  setProduct(filtered); // Update the products state
};

const highlightMatch = (text, key) => {
  if (!key) return text;
  const regex = new RegExp(`^(${key})`, "i"); // Only match at the start of the string
  return text.replace(
    regex,
    '<span class="font-bold text-highlight">$1</span>' // Match ko highlight karna
  );
};


  const handelMSGdelete = () => {
    setText("");
    setsearchkey("");
    setProduct(allProducts);
  };

  const Description = ({ text }) => {
    const [showFull, setShowFull] = useState(false);
    const limit = 90; // characters to show before "Read more"

    const toggleDescription = () => {
      setShowFull((prev) => !prev);
    };

    const displayText = showFull ? text : text.slice(0, limit);

    return (
      <div className="text-sm sm:text-sm md:text-base text-cyan-200 leading-snug">
        <span className="font-semibold text-base text-cyan-400 mr-1">Description:</span>
        <span>
          {displayText}
          {!showFull && text.length > limit && (
            <span
              onClick={toggleDescription}
              className="text-cyan-400 underline cursor-pointer ml-1"
            >
              Read more
            </span>
          )}
          {showFull && text.length > limit && (
            <span
              onClick={toggleDescription}
              className="text-cyan-400 underline cursor-pointer ml-2"
            >
              Show less
            </span>
          )}
        </span>
      </div>
    );
  };

  const Category = ({ text }) => {
    const [showFull, setShowFull] = useState(false);
    const limit = 90; // characters to show before "Read more"

    const toggleCategory = () => {
      setShowFull((prev) => !prev);
    };

    const displayText = showFull ? text : text.slice(0, limit);

    return (
      <div className="text-sm sm:text-sm md:text-base text-cyan-200 leading-snug">
        <span className="font-semibold text-base text-cyan-400 mr-1">Category:</span>
        <span>
          {displayText}
          {!showFull && text.length > limit && (
            <span
              onClick={toggleCategory}
              className="text-cyan-400 underline cursor-pointer ml-1"
            >
              Read more
            </span>
          )}
          {showFull && text.length > limit && (
            <span
              onClick={toggleCategory}
              className="text-cyan-400 underline cursor-pointer ml-2 "
            >
              Show less
            </span>
          )}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black sm:p-6 flex justify-center items-start">
      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-md border border-cyan-400/20 shadow-2xl p-3 sm:p-6 animate-fade-in">
        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute left- px-3 top-1/2 transform -translate-y-1/2 text-cyan-300 text-xl pointer-events-none animate-pulse">
              🔍
            </div>
            <input
              type="text"
              value={text}
              placeholder="Search products..."
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
        <h2 className="text-2xl sm:text-3xl font-bold text-cyan-300 mb-6 text-center">
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
            <thead className="text-left  uppercase text-cyan-400 border-b border-cyan-500/20">
              <tr>
                <th className="py-3 px-2 ">S.No</th>
                <th className="py-3 px-2">Preview</th>
                <th className="py-3 px-2">Dish Name</th>
                <th className="py-3 px-2">Price</th>
                <th className="py-3 px-2 w-[200px]">Category</th>
                <th className="py-3 px-2 w-[200px]">Description</th>
                <th className="py-3 px-2">Operation</th>
              </tr>
            </thead>
            <tbody>
              {product && product.length> 0 ? (
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
                          className={`text-justify   ${
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
                          className={`text-justify ${
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
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => deleteProduct(item._id)}
                          className="flex items-center bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-full text-sm"
                        >
                          <FaTrashAlt className="mr-1" /> Delete
                        </button>
                        <Link
                          to={`/update/${item._id}`}
                          className="flex items-center text-cyan-300 border border-cyan-400 px-3  py-2 rounded-full text-sm hover:bg-cyan-500 hover:text-white animate-pulse"
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
            <div className="text-center text-cyan-300 font-medium text-sm">
              No Products Found..😞
            </div>
          ) : (
            product.map((item, index) => (
              <div
                key={index}
                className="bg-[#202636] border border-cyan-700/30 rounded-xl p-4 py-5 shadow-md text-cyan-100 transition-all duration-300 overflow-hidden"
              >
                <p className="text-cyan-400 text-xs sm:text-sm mb-1">
                  ❤️ {index + 1}
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
                    <h3 className="text-xl sm:text-xl md:text-xl font-bold text-cyan-300 mb-2 leading-snug break-words whitespace-normal">
                      <span
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
                    </h3>

                    <p className="text-lg font-semibold sm:text-sm md:text-base break-words whitespace-normal flex flex-wrap items-start">
                      <span className="font-semibold text-lg text-cyan-400 mr-1">
                        Price:
                      </span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: highlightMatch(String(item.price), searchkey),
                        }}
                      />
                    </p>

                    <Category text={item.category} />
                    <Description text={item.description} />

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
                        ✏️ Update
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
