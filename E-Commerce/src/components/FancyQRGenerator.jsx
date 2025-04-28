import { useRef, useState, useEffect } from "react";
import QRCode from "qrcode";

const Fancy3DQRGenerator = () => {
  const canvasRef = useRef(null);
  const [dotImages, setDotImages] = useState([]);
  const [qrValue, setQrValue] = useState("https://example.com");
  const [dotScale, setDotScale] = useState(1.2); // slider to control dot size

  const handleDotImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setDotImages(files);
  };

  const generateQR = async () => {
    if (dotImages.length === 0) return;

    const qrData = await QRCode.create(qrValue, { errorCorrectionLevel: 'H' });
    const cells = qrData.modules.data;
    const size = Math.sqrt(cells.length);

    const baseCanvasSize = 300;
    const canvasSize = baseCanvasSize * 2; // for high resolution (retina displays)
    const cellSize = canvasSize / size;
    const dotSize = cellSize * dotScale;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    ctx.scale(2, 2); // so when displayed on normal screens, it looks sharper

    const loadImage = (file) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => resolve(img);
      });
    };

    const dotImgs = await Promise.all(dotImages.map(loadImage));

    const isInFinderPattern = (x, y) => {
      const patternSize = 7;
      const inTopLeft = x < patternSize && y < patternSize;
      const inTopRight = x >= size - patternSize && y < patternSize;
      const inBottomLeft = x < patternSize && y >= size - patternSize;
      return inTopLeft || inTopRight || inBottomLeft;
    };

    let i = 0;
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const dark = cells[i];
        if (dark) {
          const posX = x * (baseCanvasSize / size);
          const posY = y * (baseCanvasSize / size);

          if (isInFinderPattern(x, y)) {
            ctx.fillStyle = "black";
            ctx.fillRect(posX, posY, baseCanvasSize / size, baseCanvasSize / size);
          } else {
            const randomDot = dotImgs[Math.floor(Math.random() * dotImgs.length)];
            const centerX = posX + (baseCanvasSize / size) / 2;
            const centerY = posY + (baseCanvasSize / size) / 2;

            // 🔥 Fake 3D Shadow
            ctx.shadowColor = 'rgba(0,0,0,0.3)';
            ctx.shadowBlur = 4;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;

            ctx.drawImage(
              randomDot,
              centerX - dotSize / 2,
              centerY - dotSize / 2,
              dotSize,
              dotSize
            );

            // Reset shadow
            ctx.shadowColor = 'transparent';
          }
        }
        i++;
      }
    }
  };

  useEffect(() => {
    generateQR();
  }, [dotImages, qrValue, dotScale]);

  const downloadQR = () => {
    const link = document.createElement('a');
    link.download = 'fancy-3d-qr.png';
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Fancy 3D QR Code Generator 🎨🧊</h1>

      <input
        type="text"
        value={qrValue}
        onChange={(e) => setQrValue(e.target.value)}
        placeholder="Enter QR data (URL, text)"
        className="border rounded p-2 w-full"
      />

      <div className="flex flex-col gap-2">
        <label className="font-medium">Upload Dot Images</label>
        <input type="file" multiple accept="image/*" onChange={handleDotImageUpload} />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-medium">Dot Size Scale ({dotScale.toFixed(1)}x)</label>
        <input
          type="range"
          min="1"
          max="2"
          step="0.1"
          value={dotScale}
          onChange={(e) => setDotScale(parseFloat(e.target.value))}
        />
      </div>

      <canvas ref={canvasRef} className="border rounded bg-white w-[300px] h-[300px]" />

      <button
        onClick={downloadQR}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Download QR
      </button>
    </div>
  );
};

export default Fancy3DQRGenerator;
