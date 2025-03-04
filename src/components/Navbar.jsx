import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link> | 
      <Link to="/catalog">Catalog</Link> | 
      <Link to="/cart">Cart</Link> | 
      <Link to="/checkout">Checkout</Link> | 
      <Link to="/login">Login</Link> | 
      <Link to="/registration">Registration</Link>
    </nav>
  );
};

export default Navbar;