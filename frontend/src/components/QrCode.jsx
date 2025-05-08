import { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import { useAuth } from "../context/AuthContext";

const QrCode = () => {
  const { user } = useAuth();
  const [qrCode, setQrCode] = useState(null);

  useEffect(() => {
    if (!user?._id) return;

    const qr = new QRCodeStyling({
      width: 300,
      height: 300,
      // data: `http://192.168.29.138:3000/qrproducts/${user._id}`,
      data: `${window.location.origin}/qrproducts/${user._id}`,
      image: "food.png", // optional logo
      dotsOptions: {
        color: "#000000",
        type: "rounded",
      },
      backgroundOptions: {
        color: "#ffffff",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 20,
      },
    });
    setQrCode(qr);
  }, [user]);

  const ref = useRef(null);

  useEffect(() => {
    if (qrCode && ref.current) {
      qrCode.append(ref.current); // attach to DOM
    }
  }, [qrCode]);

  const handleDownloadUpdatedQR = () => {
    // 1. Update QR data
    qrCode.update({
      data: "https://yourdomain.com/menu/new-shop-id",
    });

    // 2. Wait for a short delay to ensure update applies, then download
    // setTimeout(() => {
    //   qrCode.download({
    //     name: "shop-qr",
    //     extension: "png",
    //   });
    // }, 300); // 300ms is usually enough
  };

  return (
    <>
      <div ref={ref}></div>
      <button onClick={handleDownloadUpdatedQR}>
        Update & Download QR anurag Hello
      </button>
    </>
  );
};

export default QrCode;
