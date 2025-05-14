import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" bg-gradient-to-r from-cyan-500 to-blue-500 text-white w-full shadow-md animate-fadeIn">
      <div className=" max-w-7xl mx-auto px-4 py-2 flex flex-col md:flex-row items-center justify-between md:space-y-0">
        {/* LEFT - Social Icons */}
        <div className="flex gap-4 text-lg">
          <a
            href="#"
            className="hover:text-yellow-300 transition transform hover:scale-110"
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            className="hover:text-yellow-300 transition transform hover:scale-110"
          >
            <FaTwitter />
          </a>
          <a
            href="#"
            className="hover:text-yellow-300 transition transform hover:scale-110"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            className="hover:text-yellow-300 transition transform hover:scale-110"
          >
            <FaGithub />
          </a>
        </div>

        {/* CENTER - Text with Pulse on 'Anurag' */}
        <p className="text-sm text-center">
          &copy; 2025{" "}
          <span className="font-semibold text-bl animate-pulse">Anurag</span>{" "}
          Code's. All rights reserved.
        </p>

        {/* RIGHT - Links */}
        <div className="flex gap-4 text-sm">
          <a href="#" className="hover:text-yellow-300 transition duration-300">
            Privacy
          </a>
          <a href="#" className="hover:text-yellow-300 transition duration-300">
            Terms
          </a>
          <a href="#" className="hover:text-yellow-300 transition duration-300">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
