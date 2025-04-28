import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCodeStyling from "qr-code-styling";

const ProductQR = () => {
  const qrRef = useRef(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [qrCode, setQrCode] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("users"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      alert("You must be logged in to generate a QR code.");
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (user) {
      const adminId = user._id;
      const isDevelopment = process.env.NODE_ENV === "development";
      const baseURL = isDevelopment
        ? "http://192.168.29.235:3000"
        : "https://your-production-url.com";
      const qrURL = `${baseURL}/qrproducts/${adminId}`;

      const qr = new QRCodeStyling({
        width: 300,
        height: 300,
        data: qrURL,
        dotsOptions: {
          type: "extra-rounded",
          gradient: {
            type: "radial",
            colorStops: [
              { offset: 0, color: "#f44336" },
              { offset: 0.5, color: "#ffeb3b" },
              { offset: 1, color: "#4caf50" },
            ],
          },
        },
        backgroundOptions: {
          color: "transparent",
        },
        image: "/food.png", // 👈 Center logo image
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 5, // Gap around the logo
          imageSize: 0.25, // 25% size of QR
        },
        cornersSquareOptions: {
          type: "extra-rounded",
          color: "#795548",
        },
        cornersDotOptions: {
          type: "rounded",
          color: "#ff9800",
        },
      });

      setQrCode(qr);
    }
  }, [user]);

  useEffect(() => {
    if (qrRef.current && qrCode) {
      qrCode.append(qrRef.current);

      qrCode.update({
        image: "/food.png",
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 5,
          imageSize: 0.5,
        },
      });
    }
  }, [qrCode]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <h1 className="text-2xl font-bold mb-4 text-cyan-700">
        Scan to View My Products
      </h1>
      <div ref={qrRef}></div>
      <p className="mt-4 text-sm text-gray-600">
        Scan this QR code to view your products page
      </p>
    </div>
  );
};

export default ProductQR;
