import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Nav from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ProductsAdd from "./components/ProductsAdd";
import ProductList1 from "./components/ProductList1";
import UpdateProduct from "./components/UpdateProduct";
import Private from "./components/PrivateComponent";
import ProductOnly from "./components/ProductOnly";
import QrCode from "./components/QrCode";
import PageNotFound from "./components/PageNotFound";
import PublicComponent from "./components/PublicComponent";
import ProfilePage from "./components/ProfilePage";
import { useAuth } from "./context/AuthContext";
import load from "../src/assets/animated.gif";
import { MdKeyboardArrowRight, MdKeyboardArrowUp } from "react-icons/md";
import { GoArrowUp } from "react-icons/go";
import "./index.css"; // ya './App.css' jo bhi hai
import { useEffect, useState } from "react";
import OptimizeProductList from "./components/OptimizeProductList";
import Dashboard from "./components/productlistComponents/Dashboard";
import ProductList from "./components/productlistComponents/ProductList";
import useAutoRequest from "./components/useAutoRequest";
// import SmoothScrollWrapper from "./components/SmoothScrollWrapper";

function App() {
  useAutoRequest();
  const publicRoutes = ["/login", "/signup"];
  const [screenSize, setScreenSize] = useState(window.innerWidth > 700);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth >= 800);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const { loading } = useAuth();
  const currentPath = location.pathname;

  const hideNavbarRoutes = ["/qrproducts", "/profile"];
  const shouldHideNavbar = hideNavbarRoutes.some((path) =>
    currentPath.startsWith(path)
  );

  const hideFooterRoutes = ["/login", "/signup", "/profile"];
  const shouldHideFooter = hideFooterRoutes.some((path) =>
    currentPath.startsWith(path)
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    let currentPosition = window.scrollY;
    let speed = 10;

    const scrollStep = () => {
      if (currentPosition > 0) {
        speed += 1;
        currentPosition -= speed;
        window.scrollTo(0, currentPosition);

        if (currentPosition > 0) {
          requestAnimationFrame(scrollStep);
        }
      }
    };

    requestAnimationFrame(scrollStep);
  };

  if (loading) {
    return (
      <div className="bg-black  w-full h-screen flex justify-center px-4 pt-">
        <div className="flex flex-col items-center">
          <img
            src={load}
            alt="Loading..."
            className="w-32 md:w-32 lg:w-32 mb-4"
          />
          <h1 className="text-white text-center">
            website only takes 1 minute so be patience please wait...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* <SmoothScrollWrapper> */}
      {(publicRoutes.includes(currentPath) ||
        (!screenSize && !shouldHideNavbar)) && <Nav />}

      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {screenSize ? (
          <Route element={<Private />}>
            <Route path="/" element={<OptimizeProductList />}>
              {/* <Route index element={<Dashboard />} /> */}
              <Route index element={<Navigate to="list" replace />} />
              <Route path="list" element={<ProductList />} />
              <Route path="add" element={<ProductsAdd />} />
              <Route path="update/:id" element={<UpdateProduct />} />
              <Route path="qrcode" element={<QrCode />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
          </Route>
        ) : (
          <Route element={<Private />}>
            <Route path="/" element={<Navigate to="/list" replace />} />

            <Route path="/list" element={<ProductList1 />} />
            <Route path="/add" element={<ProductsAdd />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/qrcode" element={<QrCode />} />
          </Route>
        )}
        <Route element={<PublicComponent />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route path="/qrproducts/:id/:shopName" element={<ProductOnly />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {(publicRoutes.includes(currentPath) ||
        (!screenSize && !shouldHideNavbar)) && <Footer />}

      {/* </SmoothScrollWrapper> */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="bounce-arrow fixed z-10 bottom-10 lg:bottom-5 right-5  text-white text-lg p-3 rounded-full shadow-lg transition duration-300 hover:scale-110 neon-glow"
        >
          <GoArrowUp className=" text-2xl text-white" />
        </button>
      )}
    </div>
  );
}

export default App;
