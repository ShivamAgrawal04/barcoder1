import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCodeStyling from "qr-code-styling";
import { saveAs } from "file-saver";
import { useAuth } from "../context/AuthContext"; // 👈 AuthContext से user

const qrCode = () => {
  const qrRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth(); // 👈 Context से user
  const [qrCode, setQrCode] = useState(null);

  // Create QR code once user available
  useEffect(() => {
    if (!user?._id) return;

    const isDevelopment = process.env.NODE_ENV === "development";
    const baseURL = isDevelopment
      ? "http://192.168.29.234:3000"
      : "https://your-production-url.com";

    const qrURL = `${baseURL}/qrproducts/${user._id}`;

    const qr = new QRCodeStyling({
      width: 300,
      height: 300,
      data: qrURL,
      image: "/food.png",
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
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 5,
        imageSize: 0.25,
      },
      cornersSquareOptions: {
        type: "extra-rounded",
        color: "#795548",
      },
      cornersDotOptions: {
        type: "dot",
        color: "#ff9800",
      },
    });

    setQrCode(qr);
  }, [user]);

  // Render QR code on screen
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

  // 🔁 Update & Download QR (Manual update)
  const handleDownloadUpdatedQR = () => {
    if (!qrCode) return;

    const newData = "https://yourdomain.com/menu/new-shop-id"; // Example updated URL
    qrCode.update({
      data: newData,
    });

    setTimeout(() => {
      qrCode.getRawData("png").then((blob) => {
        saveAs(blob, "updated-product-qr.png");
      });
    }, 300);
  };

  // ⬇️ Simple download (no update)
  const downloadQR = () => {
    if (qrCode) {
      qrCode.getRawData("png", { width: 500, height: 500 }).then((blob) => {
        saveAs(blob, "product-qr.png");
      });
    }
  };

  if (!user?._id) {
    return <p className="text-white text-center">Loading QR....</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-center px-4">
      <h1 className="text-2xl font-bold mb-4 text-cyan-400">
        Scan myDish QR 🤤
      </h1>

      <div ref={qrRef}></div>

      <p className="whitespace-pre-line mt-4 text-sm text-gray-300 break-words p-2">
        You Can Also Scan This QR CODE From:
        {"\n"}PhonePe, Paytm, Google Pay, Google Lens,
        {"\n"}or Default Scanner of Your phone... 😊
      </p>

      <div className="flex gap-4 mt-6">
        <button
          onClick={downloadQR}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Download QR
        </button>
        <button
          onClick={handleDownloadUpdatedQR}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Update & Download QR
        </button>
      </div>
    </div>
  );
};

export default qrCode;
