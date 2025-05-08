// File: src/components/CustomQRCode.jsx

import React, { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  data: "https://your-site.com",
  dotsOptions: {
    type: "classy",
    gradient: {
      type: "linear",
      rotation: 45,
      colorStops: [
        { offset: 0, color: "#00f" },
        { offset: 1, color: "#0ff" },
      ],
    },
  },
  backgroundOptions: {
    color: "#ffffff",
  },
  cornersSquareOptions: {
    type: "square",
    color: "black", // Hide for image overlay
  },
  cornersDotOptions: {
    type: "dot",
    color: "black", // Hide for image overlay
  },
  image: "food.png",
  imageOptions: {
    margin: 10,
    crossOrigin: "anonymous",
    imageSize: 0.5,
  },
});

const StyledQrCode = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, []);

  return (
    <div>
      <div ref={ref}></div>
    </div>
  );
};

export default StyledQrCode;
