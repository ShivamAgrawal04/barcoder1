import { useRef, useState, useEffect } from "react";

const DescriptionToggle = ({ text, maxLength = 100, isExpanded, onToggle }) => {
  const [height, setHeight] = useState(0);
  const contentRef = useRef();

  useEffect(() => {
    if (contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      setHeight(isExpanded ? scrollHeight : 60); // or your collapsed height
    }
  }, [isExpanded, text]);

  const shouldTruncate = text.length > maxLength;

  return (
    <div className="relative">
      <div
        className="transition-all duration-500 ease-in-out overflow-hidden"
        style={{ maxHeight: `${height}px` }}
        ref={contentRef}
      >
        <p className="text-sm text-[#CBD5E1] leading-relaxed whitespace-pre-line">
          {text}
        </p>
      </div>

      {shouldTruncate && (
        <div className="mt-1">
          <button
            onClick={onToggle} // Use the passed onToggle function here
            className="text-cyan-400 hover:text-cyan-300 text-xs font-medium focus:outline-none transition-colors duration-300"
          >
            {isExpanded ? "Read less" : "Read more"}
          </button>
        </div>
      )}
    </div>
  );
};

export default DescriptionToggle;
