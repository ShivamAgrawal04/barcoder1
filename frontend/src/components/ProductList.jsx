import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CgCloseO } from "react-icons/cg";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const ProductList = () => {
  const { user, loading } = useAuth();
  const [product, setProduct] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searchkey, setsearchkey] = useState("");
  const [text, setText] = useState("");
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

    const filtered = allProducts.filter((item) => {
      return (
        item.name.toLowerCase().includes(key) ||
        String(item.price).includes(key)
      );
    });

    setProduct(filtered);
  };

  const highlightMatch = (text, key) => {
    if (!key) return text;
    const regex = new RegExp(`(${key})`, "gi");
    return text.replace(
      regex,
      '<span class="font-bold text-teal-500">$1</span>'
    );
  };

  const handelMSGdelete = () => {
    setText("");
    setsearchkey("");
    setProduct(allProducts);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black sm:p-6 flex justify-center items-start">
      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-md border border-cyan-400/20 shadow-2xl p-4 sm:p-6 animate-fade-in">
        {/* 🔍 Search Bar */}
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

        {/* 🍕 Shop Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-cyan-300 mb-4 sm:mb-6 text-center">
          🍕{" "}
          {user?.shopName
            ?.split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}{" "}
          Food List
        </h2>

        {/* ✅ Table for large screens */}
        <div className="overflow-x-auto hidden md:block">
          <table className="w-full text-sm sm:text-base text-cyan-100">
            <thead className="text-left uppercase text-cyan-400 border-b border-cyan-500/20">
              <tr>
                <th className="py-3 px-2">S.No</th>
                <th className="py-3 px-2">Preview</th>
                <th className="py-3 px-2">Dish Name</th>
                <th className="py-3 px-2">Price</th>
                <th className="py-3 px-2">Category</th>
                <th className="py-3 px-2">Description</th>
                <th className="py-3 px-2">Operation</th>
              </tr>
            </thead>
            <tbody>
              {product.length > 0 ? (
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
                    <td
                      className="px-2"
                      dangerouslySetInnerHTML={{
                        __html: highlightMatch(item.category, searchkey),
                      }}
                    />
                    <td
                      className="px-2"
                      dangerouslySetInnerHTML={{
                        __html: highlightMatch(item.description, searchkey),
                      }}
                    />
                    <td>
                      <div className="flex flex-row gap-2 justify-center -ml-20">
                        <button
                          onClick={() => deleteProduct(item._id)}
                          className="flex bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-full text-sm"
                        >
                          <FaTrashAlt className="mt-1 mr-1" /> Delete
                        </button>
                        <Link
                          to={`/update/${item._id}`}
                          className="text-cyan-300 border border-cyan-400 px-4 py-2 rounded-full text-sm hover:bg-cyan-500 hover:text-white animate-pulse"
                        >
                          ✏ Update
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

        {/* ✅ Card view for small screens */}
        <div className="md:hidden space-y-4">
          {product.map((item, index) => (
            <div
              key={index}
              className="bg-[#202636] border border-cyan-500/20 rounded-xl p-4 py-5 shadow-md text-cyan-100"
            >
              <p className="text-cyan-400 text-sm">❤ {index + 1}</p>
              <div className="relative flex flex-row">
                <div className="flex-1 pr-4">
                  <h3 className="text-2xl mb-3 font-semibold text-cyan-300">
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
                </div>

                <div className="absolute right-0 top-0">
                  <img
                    src={item.productPic}
                    alt="Dishes Photos"
                    className="w-36 h-32 sm:w-32 sm:h-32 object-cover rounded-md"
                  />
                </div>
              </div>

              <p>
                <span className="text-lg font-semibold text-cyan-400">
                  Price:
                </span>{" "}
                <span
                  dangerouslySetInnerHTML={{
                    __html: highlightMatch(String(item.price), searchkey),
                  }}
                />
              </p>
              <p>
                <span className="text-lg font-semibold text-cyan-400">
                  Category:
                </span>{" "}
                <span
                  dangerouslySetInnerHTML={{
                    __html: highlightMatch(item.category, searchkey),
                  }}
                />
              </p>
              <p>
                <span className="text-lg font-semibold text-cyan-400">
                  Description:
                </span>{" "}
                <span
                  dangerouslySetInnerHTML={{
                    __html: highlightMatch(item.description, searchkey),
                  }}
                />
              </p>

              <div className="flex flex-row gap-2 justify-items-start mt-2">
                <button
                  onClick={() => deleteProduct(item._id)}
                  className="flex bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-full text-sm"
                >
                  <FaTrashAlt className="mt-1 mr-1" /> Delete
                </button>
                <Link
                  to={`/update/${item._id}`}
                  className="text-cyan-300 border border-cyan-400 px-4 py-2 rounded-full text-sm hover:bg-cyan-500 hover:text-white animate-pulse"
                >
                  ✏ Update
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
