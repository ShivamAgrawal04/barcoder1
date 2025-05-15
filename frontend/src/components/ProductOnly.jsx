import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { CgCloseO } from "react-icons/cg";
import Logo from "../assets/Anurag.png";
import {
  FaPenAlt,
  FaPencilAlt,
  FaPenFancy,
  FaPenNib,
  FaTrashAlt,
} from "react-icons/fa";

const ProductOnly = () => {
  const { id, shopName } = useParams();
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searchkey, setsearchkey] = useState("");
  const [text, setText] = useState("");
  const [showMore, setShowMore] = useState({});
  const [showMoreCategory, setShowMoreCategory] = useState({});
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [searchBarPosition, setSearchBarPosition] = useState("top-16");

  const socket = io(import.meta.env.VITE_API_BASE_URL, {
    withCredentials: true,
    autoConnect: false,
    query: { shopId: id },
  });

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/products/${id}`
      );
      const data = await res.json();
      setProducts(data.data);
      setAllProducts(data.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => socket.emit("join-room", id));
    socket.on("connect_error", (err) => console.error("Socket error:", err));
    socket.on("menuUpdated", ({ action, updateProduct }) => {
      setProducts((prev) => {
        if (action === "add") return [...prev, updateProduct];
        if (action === "update")
          return prev.map((p) =>
            p._id === updateProduct._id ? updateProduct : p
          );
        if (action === "delete")
          return prev.filter((p) => p._id !== updateProduct._id);
        return prev;
      });
    });
    fetchProducts();
    return () => {
      socket.off("menuUpdated");
      socket.disconnect();
    };
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 90) {
        setNavbarVisible(false);
        setSearchBarPosition("top-0");
      } else {
        setNavbarVisible(true);
        setSearchBarPosition("top-16");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handelSearch = (e) => {
    const key = e.target.value.toLowerCase();
    setsearchkey(key);
    setText(key);

    if (!key.trim()) {
      setProducts(allProducts);
      return;
    }

    const searchWords = key.split(" ").filter(Boolean); // split by space and remove empty words

    const filtered = allProducts.filter((item) => {
      const name = item.name.toLowerCase();
      const price = String(item.price);

      // sabhi words match hone chahiye name ya price me
      return searchWords.every(
        (word) => name.includes(word) || price.includes(word)
      );
    });

    setProducts(filtered);
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
    setProducts(allProducts);
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
    <div className="py-2 min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex flex-col">
      {/* Navbar */}
      <nav
        className={`-mt-2 bg-gray-800 shadow-[0_0_20px_#00ffff44] font-neon mt transition-all duration-300 ${
          navbarVisible
            ? "transform translate-y-0"
            : "transform -translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex  justify-between items-center h-16">
            <div className="items-center flex flex-row">
              <img
                className="w-14 h-14 mr-5 rounded-full object-contain animate-pulse hover:rotate-[360deg] transition-all duration-700"
                src={Logo}
                alt="Logo"
              />
              <h1 className="text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 tracking-wider">
                Anurag Code's
              </h1>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Bar */}
      <div
        className={`fixed ${searchBarPosition} left-0 w-full z-50 bg-black/40 backdrop-blur-lg shadow-md px-4 py-3 transition-all duration-300 ease-in-out`}
      >
        <div className="flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-300 text-xl pointer-events-none animate-pulse">
              🔍
            </div>
            <input
              type="text"
              value={text}
              placeholder={`Search for ${dynamicPlaceholder}`}
              className="w-full px-5 py-3 text-left pl-11 rounded-full bg-black/30 text-cyan-100 placeholder-cyan-400 border border-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 shadow-[0_0_15px_#00ffff44] transition-all duration-300 ease-in-out backdrop-blur-md animate-pulse"
              onChange={handelSearch}
            />
            {text && (
              <button
                onClick={handelMSGdelete}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-cyan-300 text-xl hover:scale-125 transition-transform"
              >
                <CgCloseO />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="pt-24 px-2 sm:px-6 overflow-y-auto flex-1">
        <h2 className="text-3xl pr-5 sm:text-3xl font-bold text-cyan-300 mb-6 text-center">
          🍕{" "}
          {shopName
            ?.split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}{" "}
          Food List
        </h2>
        {/* Product cards and table code here */}
        <div className="sm:hidden space-y-4">
          {products.length === 0 ? (
            <p className="text-center text-cyan-300 text-lg">
              No Products Found 😞
            </p>
          ) : (
            products.map((item, index) => {
              const desc = item.description || "";
              const cat = item.category || "";
              const descShort = desc.slice(0, 60);
              const catShort = cat.slice(0, 40);

              return (
                <div
                  key={index}
                  className="bg-[#202636] border  border-cyan-700/30 rounded-xl p-4 shadow-md text-cyan-100"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={item.productPic}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg shadow-md animate-float"
                    />
                    <div className="flex-1">
                      <h3
                        className="text-lg font-semibold  text-cyan-300 mb-2"
                        dangerouslySetInnerHTML={{
                          __html: highlightMatch(
                            item.name.charAt(0).toUpperCase() +
                              item.name.slice(1),
                            searchkey
                          ),
                        }}
                      />
                      <p
                        className="text-cyan-200 text-lg font-semibold"
                        dangerouslySetInnerHTML={{
                          __html: highlightMatch(`₹ ${item.price}`, searchkey),
                        }}
                      />
                      <div className="text-base text-cyan-200">
                        <span className=" font-semibold">👉</span>{" "}
                        <span
                          dangerouslySetInnerHTML={{
                            __html: highlightMatch(
                              showMoreCategory[item._id] || cat.length <= 40
                                ? cat
                                : catShort + "..."
                            ),
                          }}
                        />
                        {cat.length > 40 && (
                          <button
                            className="text-cyan-400 ml-2 hover:underline"
                            onClick={() => toggleShowMoreCategory(item._id)}
                          >
                            {showMoreCategory[item._id]
                              ? "Read less"
                              : "Read more"}
                          </button>
                        )}
                      </div>
                      <div className="text-base text-cyan-200">
                        <span className="font-semibold">👉</span>{" "}
                        <span
                          dangerouslySetInnerHTML={{
                            __html: highlightMatch(
                              showMore[item._id] || desc.length <= 60
                                ? desc
                                : descShort + "..."
                            ),
                          }}
                        />
                        {desc.length > 60 && (
                          <button
                            className="text-cyan-400 ml-2 hover:underline"
                            onClick={() => toggleShowMore(item._id)}
                          >
                            {showMore[item._id] ? "Read less" : "Read more"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* 👇 TABLE VIEW: Desktop Only */}
        <div className="hidden sm:block mx-16">
          <table className="w-full text-sm sm:text-base text-cyan-100">
            <thead className="text-left uppercase text-cyan-400 border-b border-cyan-500/20">
              <tr>
                <th className="py-3 px-2 font-semibold">S.No</th>
                <th className="py-3 px-2 font-semibold">Preview</th>
                <th className="py-3 px-2 font-semibold">Dish Name</th>
                <th className="py-3 px-2 font-semibold">Price</th>
                <th className="py-3 px-2 font-semibold w-[200px]">Category</th>
                <th className="py-3 px-2 font-semibold w-[200px]">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
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
                  <td
                    className="px-2"
                    dangerouslySetInnerHTML={{
                      __html: highlightMatch(
                        item.name.charAt(0).toUpperCase() + item.name.slice(1),
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
                  <td className="px-2 w-[200px] break-words">
                    <div>
                      <p
                        className={`${
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
                          {showMoreCategory[index] ? "Show less" : "Read more"}
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-2 w-[200px] break-words">
                    <div>
                      <p
                        className={`${
                          showMore[index] ? "" : "line-clamp-2 overflow-hidden"
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductOnly;
