import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../context/SocketContext";

const ProductOnly = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { socket, isConnected } = useSocket();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://192.168.29.138:5000/api/products/${id}`
      );
      const data = await response.json();
      console.log("Fetched products:", data.data);

      setProducts(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();

    if (socket && isConnected) {
      console.log("Joining shop room:", id);
      socket.emit("joinShop", id);

      socket.on("menuUpdated", (data) => {
        console.log("Received menu update:", data);
        switch (data.action) {
          case "add":
            setProducts((prev) => [...prev, data.product]);
            break;
          case "update":
            setProducts((prev) =>
              prev.map((p) => (p._id === data.product._id ? data.product : p))
            );
            break;
          case "delete":
            setProducts((prev) => prev.filter((p) => p._id !== data.productId));
            break;
          default:
            console.log("Unknown action:", data.action);
        }
      });
    }

    return () => {
      if (socket) {
        socket.off("menuUpdated");
      }
    };
  }, [socket, isConnected, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Connecting to server...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        No products found
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded shadow">
            <img
              src={product.productPic}
              alt={product.name}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/300x200?text=No+Image";
              }}
            />
            <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-bold">₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductOnly;
