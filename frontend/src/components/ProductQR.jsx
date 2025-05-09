import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";

const ProductQR = () => {
  const navigate = useNavigate();

  // Get the logged-in user's data from localStorage (admin's data)
  const user = JSON.parse(localStorage.getItem("users"));

  // if (!user) {
  //   alert("You must be logged in to generate a QR code.");
  //   navigate('/login');
  // }

  // Get the admin's ID from the logged-in user's data
  const adminId = user?._id;

  // Generate the URL for the QR code (link to admin's products)
  const qrURL = `http://192.168.29.234:5000/qrproducts/${adminId}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Scan to View Products</h1>
      <QRCodeCanvas value={qrURL} size={256} />
      <p className="mt-4 text-sm text-gray-600">
        Scan this QR code to view the admin's products
      </p>
    </div>
  );
};

export default ProductQR;
