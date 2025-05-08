import { Routes, Route } from "react-router-dom";
import Nav from "./components/Navbar";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ProductsAdd from "./components/ProductsAdd";
import ProductList from "./components/ProductList";
import UpdateProduct from "./components/UpdateProduct";
import Private from "./components/PrivateComponent";
import Qrcode from "./components/ProductQR";
import ProductOnly from "./components/ProductOnly";
import QrCode from "./components/QrCode";
import PageNotFound from "./components/PageNotFound";
import StyledQRCode from "./components/StyledQRCode";

function App() {
  return (
    <div>
      {/* Show Nav & Footer only for non-QR pages */}
      {/* <Routes></Routes> */}
      <Nav />
      <Routes>
        {/* <Route element={<Private />}> */}
        <Route path="/" element={<ProductList />} />
        <Route path="/add" element={<ProductsAdd />} />
        <Route path="/update/:id" element={<UpdateProduct />} />
        {/* </Route> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/qrcode" element={<QrCode />} />
        <Route path="/qrproducts/:id" element={<ProductOnly />} />
        <Route path="/qr" element={<StyledQRCode />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
