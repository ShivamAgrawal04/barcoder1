import { Routes, Route, useLocation } from "react-router-dom";
// import Lenis from "@studio-freight/lenis";
import Nav from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ProductsAdd from "./components/ProductsAdd";
import ProductList from "./components/ProductList";
import UpdateProduct from "./components/UpdateProduct";
import Private from "./components/PrivateComponent";
import ProductOnly from "./components/ProductOnly";
import QrCode from "./components/QrCode";
import PageNotFound from "./components/PageNotFound";
import PublicComponent from "./components/PublicComponent";
import { useAuth } from "./context/AuthContext";
import load from "../src/assets/fod.gif";

function App() {
  const location = useLocation();
  const { loading } = useAuth(); // <-- yeh import karo AuthContext se
  const currentPath = location.pathname;

  const hideNavbarRoutes = ["/qrproducts"];
  const shouldHideNavbar = hideNavbarRoutes.some((path) =>
    currentPath.startsWith(path)
  );

  const hideFooterRoutes = ["/login", "/signup"];
  const shouldHideFooter = hideFooterRoutes.some((path) =>
    currentPath.startsWith(path)
  );

  // Lenis

  // // Setup Lenis once on app load
  // const lenis = new Lenis({
  //   duration: 1.2,
  //   smooth: true,
  //   easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  // });

  // function raf(time) {
  //   lenis.raf(time);
  //   requestAnimationFrame(raf);
  // }

  // requestAnimationFrame(raf);

  if (loading) {
    return (
      <div className="bg-gray-600 w-full h-screen flex justify-center px-4 pt-">
        <div className="flex flex-col items-center">
          <img
            src={load}
            alt="Loading..."
            className="w-80 md:w-32 lg:w-72 mb-4"
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
      {!shouldHideNavbar && <Nav />}
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route element={<Private />}>
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<ProductsAdd />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route path="/qrcode" element={<QrCode />} />
        </Route>

        <Route element={<PublicComponent />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        <Route path="/qrproducts/:id/:shopName" element={<ProductOnly />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {!shouldHideFooter && <Footer />}
    </div>
  );
}

export default App;
