import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-[#151523] shadow-lg py-3 px-10 flex items-center justify-between 
                rounded-full mx-24 mt-5 backdrop-blur-md border border-gray-700">
      {/* Logo di kiri */}
      <div className="flex items-center">
      <Link to="/">
        <img src="/Logo CLOVIO.svg" alt="Logo CLOVIO" className="h-10 w-auto" />
      </Link>
      </div>

      {/* Search di tengah */}
      <div className="flex-1 mx-32">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 px-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Cart dan Sign Up di kanan */}
      <div className="flex items-center space-x-4">
        <Link to="/cart" className="text-gray-700 hover:text-blue-500">
          <FaShoppingCart size={22} className="text-[#FFF8E8]"/>
        </Link>
        <Link
          to="/login"
          className="bg-[#FFF8E8] text-[#151523] px-6 py-2 rounded-full font-blinky hover:bg-blue-600"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
