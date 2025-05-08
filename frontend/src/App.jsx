import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/Navbar";
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

function App() {
  const location = useLocation();
  const isQRProductPage = location.pathname.startsWith("/qrproducts/");
  return (
    <div>
      {!isQRProductPage && <Nav />}
      <Routes>
        {/* <Route element={<Private />}> */}
        <Route path="/" element={<ProductList />} />
        <Route path="/add" element={<ProductsAdd />} />
        <Route path="/update/:id" element={<UpdateProduct />} />
        <Route path="/qrcode" element={<QrCode />} />
        {/* </Route> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/qrproducts/:id" element={<ProductOnly />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {!isQRProductPage && <Footer />}
    </div>
  );
}

export default App;
