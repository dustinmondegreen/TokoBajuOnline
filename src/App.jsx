import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Footer from "./components/Footer"
import TestPage from "./pages/testpage"


const App = () => {
  return (
    <>
    <Router>
      {Navbar()}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/testpage" element={<TestPage />} />
        
      </Routes>
    </Router>
    <Footer></Footer>
    </>
  );
};

export default App;
