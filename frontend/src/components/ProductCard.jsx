import React from "react";

const ProductCard = React.memo(({ product }) => {
  return (
    <div className="shadow-md border rounded-lg p-4 bg-white hover:scale-105 transition-transform">
      <img
        src={product.image}
        alt={product.title}
        loading="lazy"
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="font-semibold mt-2">{product.title}</h3>
      <p className="text-sm text-gray-600">{product.description}</p>
      <p className="font-bold mt-2">₹{product.price}</p>
    </div>
  );
});

export default ProductCard;
