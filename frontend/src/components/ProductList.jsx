import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CgCloseO } from "react-icons/cg";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const ProductList = () => {
  const [product, setProduct] = useState([]);
  const [searchkey, setsearchkey] = useState("");
  const [text, setText] = useState("");
  const { user, getProducts, deleteProductById } = useAuth();

  const deleteProduct = async (id) => {
    const res = await deleteProductById(id);
    if (!res.success) {
      toast.error(res?.message);
    } else {
      setProduct((prevProducts) => prevProducts.filter((p) => p._id !== id));
      toast.success(res?.message);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await getProducts();
      setProduct(res);
    };
    fetch();
  }, [getProducts]);

  const handelSearch = async (events) => {
    let key = events.target.value;
    setsearchkey(key);
    setText(key);
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        method: "Get",
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();

      if (result) {
        setProduct(result);
      }
    } else {
      getProducts();
    }
  };

  const highlightMatch = (text, key) => {
    if (!key) return text;

    const regex = new RegExp(`(${key})`, "gi");
    return text.replace(
      regex,
      '<span class="bg-yellow-300 text-black px-1 rounded-sm">$1</span>'
    );
  };

  const handelMSGdelete = () => {
    setText("");
    getProducts();
    setsearchkey("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black p-4 sm:p-6 flex justify-center items-start">
      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-md border border-cyan-400/20 rounded-2xl shadow-2xl p-4 sm:p-6 animate-fade-in">
        <div className="mb-6 flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute left- px-3 top-1/2 transform -translate-y-1/2 text-cyan-300 text-xl pointer-events-none animate-pulse">
              🔍
            </div>
            <input
              type="text"
              value={text}
              placeholder="Search products..."
              className="w-full px-5 py-3 text-left pl-11  rounded-full bg-black/30 text-cyan-100 placeholder-cyan-400 border border-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 shadow-[0_0_15px_#00ffff44] transition-all duration-300 ease-in-out backdrop-blur-md"
              onChange={handelSearch}
            />

            {text && (
              <button
                onClick={handelMSGdelete}
                className="absolute transition-transform  hover:scale-125  hover:ease-in-ou duration-300 cursor-pointer right-1 px-3 top-1/2 transform -translate-y-1/2 text-cyan-300 text-xl"
              >
                <CgCloseO />
              </button>
            )}
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-cyan-300 mb-4 sm:mb-6 text-center">
          🍕{" "}
          {user?.shopName
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}{" "}
          Food List
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm sm:text-base text-cyan-100">
            <thead className=" text-left uppercase text-cyan-400 border-b border-cyan-500/20">
              <tr>
                <th className="py-3 px-2 sm:px-4">S.No</th>
                <th className="py-3 px-2 sm:px:4">Preview</th>
                <th className="py-3 px-2 sm:px-4">Product Name</th>
                <th className="py-3 px-2 sm:px-4">Price</th>
                <th className="py-3 px-2 sm:px-4">Category</th>
                <th className="py-3 px-2 sm:px-4">Description</th>
                <th className="py-3 px-2 sm:px-4 text-center">Operation</th>
              </tr>
            </thead>
            <tbody>
              {product && product.length > 0 ? (
                product.map((item, index) => (
                  <tr
                    key={index}
                    className=" hover:bg-white/10 border-b border-white/10 transition-all"
                  >
                    <td className="py-2 px-2 sm:px-4 text-center">
                      {index + 1}
                    </td>

                    <td>
                      <img
                        className="h-12 w-12 object-cover"
                        src={item.productPic}
                        alt=""
                      />
                    </td>

                    <td
                      className="py-2 px-2 sm:px-4"
                      dangerouslySetInnerHTML={{
                        __html: highlightMatch(item.name, searchkey),
                      }}
                    />
                    <td
                      className="py-2 px-2 sm:px-4"
                      dangerouslySetInnerHTML={{
                        __html: highlightMatch(String(item.price), searchkey),
                      }}
                    />
                    <td
                      className="py-2 px-2 sm:px-4"
                      dangerouslySetInnerHTML={{
                        __html: highlightMatch(item.category, searchkey),
                      }}
                    />
                    <td
                      className="py-2 px-2 sm:px-4"
                      dangerouslySetInnerHTML={{
                        __html: highlightMatch(item.description, searchkey),
                      }}
                    />

                    <td className="py-2 lg:px-2 px-7 sm:px-4 text-center flex flex- sm:flex-row justify-center items-center lg:gap-2 gap-3 ">
                      <button
                        onClick={() => deleteProduct(item._id)}
                        className=" -ml-9 group relative inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 ease-in-out overflow-hidden text-sm "
                      >
                        <span className="z-10 flex items-center gap-1 font-semibold">
                          <FaTrashAlt className="text-white group-hover:scale-110 transition-transform duration-300" />
                          Delete
                        </span>
                        <span className="absolute inset-0 bg-white opacity-10 blur-md transition-all duration-500 group-hover:opacity-20"></span>
                      </button>
                      <Link
                        to={`/update/${item._id}`}
                        className="inline-block px-4 lg:py-2 text-sm font-semibold text-cyan-300 border border-cyan-400 rounded-full hover:bg-cyan-500 hover:text-white transition-all duration-300 shadow-[0_0_10px_#00ffff55] hover:shadow-[0_0_20px_#00ffff99] animate-pulse"
                      >
                        ✏️ Update
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-cyan-200">
                    No Products Found..😞
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
