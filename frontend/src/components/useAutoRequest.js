import { useEffect } from "react";
import axios from "../context/axios";

const useAutoRequest = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("/users/me") // Replace with your actual URL
        .then((response) => {
          console.log("Server response:", response.data);
        })
        .catch((error) => {
          console.error("Request error:", error);
        });
    }, 14 * 60 * 1000); // 14 minutes in milliseconds

    return () => clearInterval(interval); // Cleanup
  }, []);
};

export default useAutoRequest;
