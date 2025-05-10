import QRCodeStyling from "qr-code-styling";

const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  data: "Helo iam shivam",
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0VlMUxbsc3TeLacOKL60mMRE-mL6L6MmMCw&s",
  dotsOptions: {
    color: "#1a1a1a",
    type: "rounded",
  },
  backgroundOptions: {
    color: "#ffffff",
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 10,
  },
  cornersSquareOptions: {
    type: "dot",
    color: "#ff0000",
  },
  cornersDotOptions: {
    type: "dot",
    color: "#0000ff",
  },
});

window.addEventListener("DOMContentLoaded", () => {
  qrCode.append(document.getElementById("qr-code"));
  qrCode.download({ name: "custom-qr", extension: "png" });
});
