import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product"
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Footer from "./components/Footer"
import Receipt from "./pages/Receipt"; 
import ReceiptPage from "./pages/ReceiptPage";
import ForgetPassword from "./pages/ForgetPasswrod";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white w-full">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/product" element={<Product/>} />
          <Route path="/adminHome" element={<adminHome />} />
          <Route path="/receipt/:orderId" element={<Receipt />} />
          <Route path="/receipt" element={<ReceiptPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
