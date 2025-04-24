import { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const productItems = [
  { name: "T-Shirts", icon: "👕", link: "/t-shirts" },
  { name: "Hoodie", icon: "🧥", link: "/hoodies" },
  { name: "Jacket", icon: "🧥", link: "/jackets" },
  { name: "Vest", icon: "🦺", link: "/vests" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    } 
  };

  return (
    <>
      <nav className="bg-[#151523] shadow-lg py-3 px-10 flex items-center justify-between rounded-full mx-24 mt-5 mb-5 backdrop-blur-md border border-gray-700">
        <div className="">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="2.8" 
            stroke="currentColor" 
            className="size-12 mr-12 text-white hover:text-blue-600 cursor-pointer transition-colors"
            onClick={toggleSidebar}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </div>
        <div className="flex items-center ml-12 mr-14">
          <Link to="/">
            <img src="/Logo CLOVIO.svg" alt="Logo CLOVIO" className="h-10 w-auto" />
          </Link>
        </div>

        <div className="flex-1 mx-64 relative ml-12">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#151523]" size={20} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex items-center space-x-8">
          <Link to="/cart" className="text-gray-700 hover:text-blue-600">
            <FaShoppingCart size={22} />
          </Link>
          <Link
            to="/login"
            className="bg-[#FFF8E8] text-[#151523] px-6 py-2 rounded-full font-blinky hover:bg-blue-600"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleSidebar} />
      )}

      <div className={`fixed top-0 left-0 h-full w-80 bg-[#151523] z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <Link to="/" onClick={toggleSidebar}>
              <img src="/Logo CLOVIO.svg" alt="Logo CLOVIO" className="h-8" />
            </Link>
            <IoClose 
              size={24} 
              className="text-white hover:text-blue-600 cursor-pointer"
              onClick={toggleSidebar}
            />
          </div>

          <div className="mb-8">
            <h2 className="text-white text-lg font-semibold mb-4">Products Catalog</h2>
            <div className="grid grid-cols-2 gap-4">
              {productItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.link}
                  onClick={toggleSidebar}
                  className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <span className="mr-2">{item.icon}</span>
                  <span className="text-white text-sm">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/cart"
            onClick={toggleSidebar}
            className="flex items-center text-white hover:text-blue-600 mb-8 transition-colors"
          >
            <FaShoppingCart className="mr-2" />
            <span>Cart</span>
          </Link>

          <div className="mt-auto">
            <div className="mb-6">
              <h2 className="text-white text-lg font-semibold mb-4">Support</h2>
              <div className="flex flex-col space-y-3">
                <Link
                  to="/faq"
                  onClick={toggleSidebar}
                  className="text-white hover:text-blue-600 transition-colors text-sm"
                >
                  FAQ
                </Link>
                <Link
                  to="/contact"
                  onClick={toggleSidebar}
                  className="text-white hover:text-blue-600 transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            <Link
              to="/login"
              onClick={toggleSidebar}
              className="block w-full text-center bg-[#FFF8E8] text-[#151523] px-6 py-2 rounded-full font-blinky hover:bg-blue-600 hover:text-white transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;