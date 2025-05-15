import { useState, useEffect, useRef } from "react";
const useTypewriter = (words, typingSpeed = 150, pauseDelay = 1000) => {
  const [charIndex, setCharIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [dynamicPlaceholder, setDynamicPlaceholder] = useState("");
  const timeoutRef = useRef(null);

  useEffect(() => {
    const currentWord = words[wordIndex];

    if (charIndex <= currentWord.length) {
      setDynamicPlaceholder(currentWord.slice(0, charIndex));
      timeoutRef.current = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, typingSpeed);
    } else {
      timeoutRef.current = setTimeout(() => {
        setCharIndex(0);
        setWordIndex((prev) => (prev + 1) % words.length);
      }, pauseDelay);
    }

    return () => clearTimeout(timeoutRef.current); // Clean up timeout on re-render/unmount
  }, [charIndex, wordIndex, words, typingSpeed, pauseDelay]);

  return dynamicPlaceholder;
};

export default useTypewriter;
