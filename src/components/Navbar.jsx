import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const productItems = [
  { name: "T-Shirts", icon: "👕", link: "/Product" },
  { name: "Hoodie", icon: "🧥", link: "/Product" },
  { name: "Jacket", icon: "🧥", link: "/Product" },
  { name: "Vest", icon: "🦺", link: "/Product" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Add this state
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
          <Link to="/cart" className="text-white hover:text-blue-600 transition-colors">
            <FaShoppingCart size={22} />
          </Link>

          {/* Profile Section */}
          <div className="relative" ref={profileRef}>
            {isAuthenticated ? (
              // Profile Button and Dropdown for authenticated users
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="relative group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8 text-white hover:text-blue-600 transition-colors"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </button>

                {/* Profile Dropdown Menu */}
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#151523] rounded-lg shadow-lg border border-gray-700 overflow-hidden">
                    <div className="p-4 border-b border-gray-700">
                      <p className="text-[#FFF8E8] font-medium">John Doe</p>
                      <p className="text-gray-400 text-sm">john@example.com</p>
                    </div>
                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-[#FFF8E8] hover:bg-blue-600 transition-colors"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-[#FFF8E8] hover:bg-blue-600 transition-colors"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        My Orders
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-[#FFF8E8] hover:bg-blue-600 transition-colors"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          setIsAuthenticated(false);
                          setShowProfileDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 text-[#FFF8E8] hover:bg-blue-600 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Sign In Button for non-authenticated users
              <Link
                to="/login"
                className="relative group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8 text-white hover:text-blue-600 transition-colors"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>

                <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 -bottom-14 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#151523] text-[#FFF8E8] text-base font-bold py-3 px-16 rounded-lg shadow-lg border border-gray-700">
                  Sign in
                </div>
              </Link>
            )}
          </div>
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