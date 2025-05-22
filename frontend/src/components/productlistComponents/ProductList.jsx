import React, { useState, useEffect, useMemo, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import DescriptionToggle from "./DescriptionToggle";
import { VariableSizeList as List } from "react-window";
import SearchBar from "./SearchBar";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaPenAlt, FaTrashAlt } from "react-icons/fa";

const highlightMatch = (text, query) => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-cyan-400 text-black rounded px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  );
};

const Row = ({ index, style, data }) => {
  const { item, searchQuery, isExpanded, onToggle, setProducts } = data[index];

  const { deleteProductById } = useAuth();

  const handleDeleteProductById = async (id) => {
    const res = await deleteProductById(id);
    console.log(res);
    if (res.success) {
      toast.success(res?.message);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } else {
      toast.error(res?.message);
    }
  };

  return (
    <div
      style={style}
      className="flex text-sm text-[#CBD5E1] px-4 py-4 items-center border-b border-[#475569] hover:bg-[#2E3A4F] transition-colors"
    >
      <div className="flex-shrink-0 flex-grow-0 basis-[50px]">{index + 1}</div>
      <div className="flex-shrink-0 flex-grow-0 basis-[80px]">
        <img
          src={item.productPic}
          alt="Dish"
          className="w-16 h-16 object-cover rounded-md"
          loading="lazy"
        />
      </div>
      <div className="flex-grow basis-[200px]">
        {highlightMatch(
          item.name
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),

          searchQuery
        )}
      </div>
      <div className="flex-shrink-0 flex-grow-0 basis-[80px]">
        ₹ {highlightMatch(item.price.toString(), searchQuery)}
      </div>
      <div className="flex-grow basis-[120px] capitalize">
        {highlightMatch(item.category ?? "", searchQuery)}
      </div>
      <div className="flex-grow basis-[300px] pr-4">
        <DescriptionToggle
          text={item.description}
          maxLength={100}
          isExpanded={isExpanded}
          onToggle={() => onToggle(index)}
        />
      </div>
      <div className="flex-shrink-0 flex-grow-0 basis-[220px] flex gap-2">
        <button
          onClick={() => handleDeleteProductById(item._id)}
          className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm "
        >
          <FaTrashAlt className="mr-1" /> Delete
        </button>
        <Link
          to={`/update/${item._id}`}
          className="flex items-center bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-full text-sm "
        >
          <FaPenAlt className="mr-1 text-white" />
          Update
        </Link>
      </div>
    </div>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { getProducts } = useAuth();
  const [expandedRows, setExpandedRows] = useState(new Set());
  const listRef = useRef();
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const listHeight = dimensions.height - 140; // adjust padding/offset as needed
  const listWidth = dimensions.width < 768 ? dimensions.width - 32 : "100%"; // full width on mobile, container width on desktop

  const toggleRow = (index) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });

    // Tell react-window to recompute sizes from this index onward
    if (listRef.current) {
      listRef.current.resetAfterIndex(index);
    }
  };

  const collapsedHeight = 130; // approximate height of collapsed row
  const expandedHeight = 250; // approximate height when description is expanded

  const getItemSize = (index) =>
    expandedRows.has(index) ? expandedHeight : collapsedHeight;

  useEffect(() => {
    const fetch = async () => {
      const res = await getProducts();
      setProducts(res);
    };
    fetch();
  }, [getProducts]);

  const filteredProducts = useMemo(() => {
    const lower = searchQuery.toLowerCase();
    return products
      .filter((p) => {
        const nameMatch = p.name?.toLowerCase().includes(lower);
        const priceMatch = p.price?.toString().includes(lower);
        const categoryMatch = p.category?.toLowerCase().includes(lower);
        return nameMatch || priceMatch || categoryMatch;
      })
      .map((item, index) => ({
        item,
        searchQuery,
        isExpanded: expandedRows.has(index),
        onToggle: toggleRow,
        setProducts,
      }));
  }, [products, searchQuery, expandedRows]);

  const itemData = filteredProducts.map(({ item, searchQuery }, idx) => ({
    item,
    searchQuery,
    isExpanded: expandedRows.has(idx),
    onToggle: toggleRow,
    setProducts,
  }));

  return (
    <div>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="overflow-x-auto">
        <div className="rounded-lg border border-[#475569] bg-[#1E293B] h-full min-w-[700px] w-full">
          <div className="flex bg-[#334155] text-[#F1F5F9] text-sm font-semibold h-full px-4 py-3">
            <div className="flex-shrink-0 flex-grow-0 basis-[50px]">S.NO</div>
            <div className="flex-shrink-0 flex-grow-0 basis-[80px]">
              Preview
            </div>
            <div className="flex-grow basis-[200px]">Dish Name</div>
            <div className="flex-shrink-0 flex-grow-0 basis-[80px]">Price</div>
            <div className="flex-grow basis-[120px]">Category</div>
            <div className="flex-grow basis-[300px] pr-4">Description</div>
            <div className="flex-shrink-0 flex-grow-0 basis-[220px]">
              Operation
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 animate-fade-in">
              <img
                src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
                alt="No products"
                className="w-20 h-20 mb-4 opacity-80"
              />
              <p className="text-cyan-300 text-lg font-semibold">
                No Products Found 😞
              </p>
              <p className="text-sm text-cyan-500 mt-1">
                Try searching something else.
              </p>
            </div>
          ) : (
            <List
              height={listHeight}
              itemCount={filteredProducts.length}
              itemSize={getItemSize}
              width={listWidth}
              itemData={itemData}
              ref={listRef}
            >
              {Row}
            </List>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
