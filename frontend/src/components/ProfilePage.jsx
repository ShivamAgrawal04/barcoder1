import React from "react";
import { motion } from "framer-motion";
import Anurag from "../assets/Anurag.jpg";
import Tanmay from "../assets/Tanmay.jpg";
import Shivam from "../assets/Shivam.jpg";
import Ankur from "../assets/Ankur.jpg";
import {
  FaWhatsapp,
  FaEnvelope,
  FaReact,
  FaNodeJs,
  FaJava,
  FaInstagram,
} from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";
import { useNavigate } from "react-router-dom";

const people = [
  {
    name: "Anurag Vishwakarma",
    title: "Full Stack Developer",
    company: "CodeVerse Pvt. Ltd.",
    qualifications: "MCA | BCA",
    image: Anurag,
  },
  {
    name: "Shivam Agarwal",
    title: "Backend Developer",
    company: "DesignCraft Studio",
    qualifications: "MCA | BCA",
    image: Shivam,
  },
  {
    name: "Tanmay Chaudhary",
    title: "Android Developer",
    company: "ServerHub",
    qualifications: "MCA | BCA",
    image: Tanmay,
  },
  {
    name: "Ankur Chauhan",
    title: "Data Management",
    company: "PixelSoft",
    qualifications: "MCA | BCA",
    image: Ankur,
  },
];

const techStack = [
  { icon: <FaReact />, label: "React.js" },
  { icon: <FaNodeJs />, label: "Node.js" },
  { icon: <FaJava />, label: "Java" },
  { icon: <SiTailwindcss />, label: "Tailwind" },
];

const message = "Hello, I need help Developers for website!";
const encode = encodeURIComponent(message);

const ProfileCard = ({ person }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-cyan-950/60 backdrop-blur p-5 rounded-2xl shadow-xl border border-cyan-600 text-cyan-100 w-full sm:w-[80%] md:w-[60%] lg:w-[45%] xl:w-[22%] break-words"
  >
    <div className=" flex flex-col sm:flex-row xl:flex-col items-center gap-4 xl:gap-2 text-center xl:text-center">
      {/* Image */}
      <img
        src={person.image}
        alt={person.name}
        className="w-20  h-20 xl:w-16 xl:h-16 rounded-full object-cover shadow-lg border-2 border-blue-600"
      />

      {/* Text Content */}
      <div>
        <h2 className="text-lg font-poppins  text-cyan-300">{person.name}</h2>
        <p className="text-cyan-500 text-sm">{person.title}</p>
        <p className="text-sm ">{person.qualifications}</p>
      </div>
    </div>
  </motion.div>
);

const ContactCard = ({ icon, title, content, link }) => (
  <motion.a
    whileHover={{ scale: 1.05 }}
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="relative overflow-hidden bg-cyan-900/60 backdrop-blur border border-cyan-700 rounded-2xl shadow-lg p-5 flex items-center gap-4 text-cyan-100 hover:bg-cyan-800 transition w-full sm:w-[80%] md:w-[60%] lg:w-[45%] xl:w-[30%] group break-words"
  >
    <span className="absolute  top-0 left-[-75%] w-[24%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform rotate-12 animate-shine pointer-events-none" />
    <div className="text-3xl text-green-400">{icon}</div>
    <div>
      <p className="font-semibold text-lg text-cyan-500">{title}</p>
      <p className="text-sm text-cyan-300">{content}</p>
    </div>
  </motion.a>
);

export default function ProfilePage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-cyan-950 text-white p-5">
      {/* Back Button */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="rgb-border-btn text-cyan-400 min-w-[120px] px-4 py-2 border border-cyan-600 rounded"
        >
          👈 Back to Menu
        </button>
        <p className="text-sm text-gray-400">
          If you want to contact us, details below 👇
        </p>
      </div>

      {/* Team Section */}
      <h2 className="text-3xl font-bold text-center text-yellow-400 mb-6 mt-6">
        Meet Our Awesome Team 🧑‍💼
      </h2>
      <div className="flex flex-col md:flex-row md:flex-wrap justify-center gap-6 items-center">
        {people.map((person, i) => (
          <ProfileCard key={i} person={person} />
        ))}
      </div>

      {/* Contact Section */}
      <h1 className="text-2xl font-semibold text-yellow-600 mt-12 mb-4 text-center">
        Contact Us
      </h1>
      <div className="flex flex-col md:flex-row md:flex-wrap justify-center gap-6 items-center">
        <ContactCard
          icon={<FaWhatsapp />}
          title="WhatsApp"
          content="Chat with us on WhatsApp"
          link={`https://wa.me/9452034738?text=${encode}`}
        />
        <ContactCard
          icon={<FaEnvelope className="text-orange-600" />}
          title="Email"
          content="scanmydish@gmail.com"
          link="mailto:scanmydish@gmail.com"
        />
        <ContactCard
          icon={<FaInstagram className="text-pink-400" />}
          title="Instagram"
          content="#ScanMyDish (Visit for updates!)"
          link="https://www.instagram.com/scanmydish/"
        />
      </div>

      {/* Services Section */}
      <h1 className="text-2xl font-semibold text-yellow-600 mt-12 mb-4 text-center">
        Want to Build a Website or App? 🚀
      </h1>
      <div className="flex flex-col md:flex-row md:flex-wrap justify-center gap-6 items-center">
        {[
          {
            title: "Personal Portfolio",
            desc: "Want a stylish and modern portfolio to showcase your skills? We build responsive and elegant portfolios using React and Tailwind CSS.",
          },
          {
            title: "Business Website",
            desc: "From restaurants to stores, we create fast, beautiful, and mobile-friendly websites tailored for your business.",
          },
          {
            title: "Full-Stack Projects",
            desc: "Need custom solutions like e-commerce, inventory systems or admin dashboards? We build powerful full-stack apps with React & Node.js.",
          },
        ].map((service, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-cyan-950/70 p-5 w-full sm:w-[80%] md:w-[60%] lg:w-[45%] xl:w-[30%] rounded-2xl shadow-lg border border-cyan-700 text-cyan-100 break-words"
          >
            <h3 className="text-lg font-bold text-cyan-300 mb-2">
              {service.title}
            </h3>
            <p className="text-sm text-cyan-400">{service.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Tech Stack Section */}
      <h1 className="text-2xl font-semibold text-yellow-600 mt-12 mb-4 text-center">
        Our Stack 💻
      </h1>
      <div className="flex flex-wrap justify-center gap-4">
        {techStack.map((tech, index) => (
          <motion.div
            key={index}
            whileHover={{ rotate: 10 }}
            className="text-3xl text-cyan-300 bg-gray-900 p-3 rounded-full shadow-md border border-cyan-600 flex flex-col items-center"
            style={{ width: "60px" }}
          >
            {tech.icon}
            <p className="text-xs mt-1 text-center text-cyan-400">
              {tech.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
