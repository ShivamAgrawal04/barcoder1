// useAnimatedPlaceholder.js
import { useState, useEffect, useRef } from "react";

const useAnimatedPlaceholder = ({
  words,
  typingSpeed = 120,
  pauseTime = 1500,
}) => {
  const [placeholder, setPlaceholder] = useState("");
  const wordIndex = useRef(0);
  const charIndex = useRef(0);
  const isDeleting = useRef(false);
  const timeoutId = useRef(null);

  useEffect(() => {
    const type = () => {
      const currentWord = words[wordIndex.current];
      if (!isDeleting.current) {
        if (charIndex.current <= currentWord.length) {
          setPlaceholder(currentWord.substring(0, charIndex.current));
          charIndex.current += 1;
          timeoutId.current = setTimeout(type, typingSpeed);
        } else {
          isDeleting.current = true;
          timeoutId.current = setTimeout(type, pauseTime);
        }
      } else {
        if (charIndex.current >= 0) {
          setPlaceholder(currentWord.substring(0, charIndex.current));
          charIndex.current -= 1;
          timeoutId.current = setTimeout(type, typingSpeed / 2);
        } else {
          isDeleting.current = false;
          wordIndex.current = (wordIndex.current + 1) % words.length;
          charIndex.current = 0;
          timeoutId.current = setTimeout(type, typingSpeed);
        }
      }
    };

    type();
    return () => clearTimeout(timeoutId.current);
  }, [words, typingSpeed, pauseTime]);

  return placeholder;
};

export default useAnimatedPlaceholder;
