import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCodeStyling from "qr-code-styling";
import { saveAs } from "file-saver";
import { useAuth } from "../context/AuthContext";

const qrCode = () => {
  const qrRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [qrCode, setQrCode] = useState(null);

  useEffect(() => {
    if (!user?._id) return;

    const qrURL = `${import.meta.env.VITE_API_QR_CODE}/qrproducts/${
      user?._id
    }/${user.shopName}`;

    const qr = new QRCodeStyling({
      width: 300,
      height: 300,
      data: qrURL,
      image: "/bu.png",
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

  useEffect(() => {
    if (qrRef.current && qrCode) {
      qrCode.append(qrRef.current);

      qrCode.update({
        image: "/bu.png",
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 5,
          imageSize: 0.5,
        },
      });
    }
  }, [qrCode]);

  const handleDownloadUpdatedQR = () => {
    if (!qrCode) return;

    const newData = "https://yourdomain.com/menu/new-shop-id";
    qrCode.update({
      data: newData,
    });

    setTimeout(() => {
      qrCode.getRawData("png").then((blob) => {
        saveAs(blob, "updated-product-qr.png");
      });
    }, 300);
  };

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-black px-4 sm:px-6 py-10 sm:py-16">
      {/* Heading */}
      <h2 className="pl-1 text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-cyan-400 text-center -mt-5 sm:mt-10 md:mt-10 mb-6 lg:mt-5">
        Scan mydish Qr 🤤
      </h2>

      {/* QR Code */}
      <div ref={qrRef} className="mb-4"></div>

      {/* Info Text */}
      <p className="text-justify text-sm sm:text-base text-gray-300 text-cente max-w-md whitespace-pre-line mb-6">
        You Can Also Scan This QR CODE From:
        {"\n"}PhonePe, Paytm, Google Pay, Google Lens,
        {"\n"}or Default Scanner of Your Phone.... 😊
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={downloadQR}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-full sm:w-auto"
        >
          Download QR
        </button>
        <button
          onClick={handleDownloadUpdatedQR}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition w-full sm:w-auto"
        >
          Update & Download QR
        </button>
      </div>
    </div>
  );
};

export default qrCode;
