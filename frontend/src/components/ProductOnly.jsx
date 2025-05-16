import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { CgCloseO } from "react-icons/cg";
import Logo from "../assets/Anurag.png";
import useTypewriter from "./useTypeWriter";

// ✅ Custom debounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

const ProductOnly = () => {
  const { id, shopName } = useParams();
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searchkey, setSearchkey] = useState("");
  const [visibleCount, setVisibleCount] = useState(20); // initially 20

  const [showMore, setShowMore] = useState({});
  const [showMoreCategory, setShowMoreCategory] = useState({});
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const [searchBarPosition, setSearchBarPosition] = useState("top-16");

  const debouncedSearchKey = useDebounce(searchkey, 300);
  const socketRef = useRef(null);

  // ✅ Fetch products initially
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

  // ✅ Setup Socket.IO
  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_BASE_URL, {
      withCredentials: true,
      autoConnect: false,
      query: { shopId: id },
    });

    socketRef.current = socket;
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

  // ✅ Scroll behavior for hiding navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setNavbarVisible(scrollPosition <= 20);
      setSearchBarPosition(scrollPosition <= 20 ? "top-16" : "top-0");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Debounced search filter
  const filteredProducts = useMemo(() => {
    const key = debouncedSearchKey.toLowerCase();

    if (!key.trim()) return allProducts;

    const searchWords = key.split(" ").filter(Boolean);

    return allProducts.filter((item) => {
      const name = item.name.toLowerCase();
      const price = String(item.price);
      return searchWords.every(
        (word) => name.includes(word) || price.includes(word)
      );
    });
  }, [debouncedSearchKey, allProducts]);

  // ✅ Input change handler
  const handelSearch = useCallback((e) => {
    setSearchkey(e.target.value);
  }, []);

  // ✅ Clear search input
  const handelMSGdelete = useCallback(() => {
    setInputValue("");
    setSearchkey("");
    setProducts(allProducts);
  }, [allProducts]);

  // ✅ Toggle show more for long description
  const toggleShowMore = useCallback((id) => {
    setShowMore((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  // ✅ Toggle show more for long category
  const toggleShowMoreCategory = useCallback((id) => {
    setShowMoreCategory((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  // ✅ Highlight matched text
  const highlightMatch = useCallback((text, key) => {
    if (!key) return text;

    const words = key.split(" ").filter(Boolean);
    if (words.length === 0) return text;

    const regex = new RegExp(`(${words.join("|")})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="font-bold text-[#24e024]">
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  }, []);

  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (bottom) {
        setVisibleCount((prev) => Math.min(prev + 20, filteredProducts.length));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [filteredProducts]);

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
              value={searchkey}
              placeholder={`Search for ${dynamicText}`}
              className="w-full px-5 py-3 text-left pl-11 rounded-full bg-black/30 text-cyan-100 placeholder-cyan-400 border border-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 shadow-[0_0_15px_#00ffff44] transition-all duration-300 ease-in-out backdrop-blur-md animate-pulse"
              onChange={handelSearch}
            />
            {searchkey && (
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
        <h2 className="text-2xl pr-5 sm:text-3xl font-bold text-cyan-300 mb-6 text-center">
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
            visibleProducts.map((item, index) => {
              const desc = item.description || "";
              const cat = item.category || "";
              const descShort = desc.slice(0, 60);
              const catShort = cat.slice(0, 40);

              const isShowFullDesc = showMore[item._id] || desc.length <= 60;
              const isShowFullCat =
                showMoreCategory[item._id] || cat.length <= 40;

              return (
                <div
                  key={index}
                  className="bg-[#202636] border border-cyan-700/30 rounded-xl p-4 shadow-md text-cyan-100"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={item.productPic}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg shadow-md animate-float"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-cyan-300 mb-2">
                        {highlightMatch(
                          item.name.charAt(0).toUpperCase() +
                            item.name.slice(1),
                          searchkey
                        )}
                      </h3>

                      <p className="text-cyan-200 text-lg font-semibold">
                        {highlightMatch(`₹ ${item.price}`, searchkey)}
                      </p>

                      <div className="text-base text-cyan-200">
                        <span className="font-semibold">👉</span>{" "}
                        <span>
                          {highlightMatch(
                            isShowFullCat ? cat : catShort + "..."
                          )}
                        </span>
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
                        <span>
                          {highlightMatch(
                            isShowFullDesc ? desc : descShort + "..."
                          )}
                        </span>
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
              {visibleProducts.map((item, index) => {
                const name =
                  item.name.charAt(0).toUpperCase() + item.name.slice(1);
                const price = String(item.price);
                const category = item.category || "";
                const description = item.description || "";
                const isCatExpanded = showMoreCategory[index];
                const isDescExpanded = showMore[index];

                return (
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

                    <td className="px-2">{highlightMatch(name, searchkey)}</td>

                    <td className="px-2">{highlightMatch(price, searchkey)}</td>

                    <td className="px-2 w-[200px] break-words">
                      <div>
                        <p
                          className={`${
                            isCatExpanded ? "" : "line-clamp-2 overflow-hidden"
                          } transition-all duration-300`}
                        >
                          {highlightMatch(category, searchkey)}
                        </p>
                        {category.length > 40 && (
                          <button
                            className="text-xs text-cyan-400 mt-1 hover:underline focus:outline-none"
                            onClick={() =>
                              setShowMoreCategory((prev) => ({
                                ...prev,
                                [index]: !prev[index],
                              }))
                            }
                          >
                            {isCatExpanded ? "Show less" : "Read more"}
                          </button>
                        )}
                      </div>
                    </td>

                    <td className="px-2 w-[200px] break-words">
                      <div>
                        <p
                          className={`${
                            isDescExpanded ? "" : "line-clamp-2 overflow-hidden"
                          } transition-all duration-300`}
                        >
                          {highlightMatch(description, searchkey)}
                        </p>
                        {description.length > 90 && (
                          <button
                            className="text-xs text-cyan-400 mt-1 hover:underline focus:outline-none"
                            onClick={() =>
                              setShowMore((prev) => ({
                                ...prev,
                                [index]: !prev[index],
                              }))
                            }
                          >
                            {isDescExpanded ? "Show less" : "Read more"}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductOnly;
