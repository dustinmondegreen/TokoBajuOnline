import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import axios from "axios";

const productItems = [
  { name: "T-Shirts", icon: "👕", link: "/Catalog?type=T-Shirt" },
  { name: "Hoodie", icon: "🧥", link: "/Catalog?type=Hoodie" },
  { name: "Jacket", icon: "🧥", link: "/Catalog?type=Jacket" },
  { name: "Vest", icon: "🦺", link: "/Catalog?type=Vest" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Sidebar utama
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Sidebar profile
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // Dropdown settings
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error("Failed to parse user from localStorage:", error);
          localStorage.removeItem("user");
        }
      } else {
        setUser(null);
      }
    };

    checkUser();
    window.addEventListener("storage", checkUser);

    return () => {
      window.removeEventListener("storage", checkUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsProfileOpen(false); // Tutup sidebar profile
    navigate("/"); // Arahkan ke halaman utama
  };

  const handleSaveProfile = async () => {
    if (!user) {
      alert("No user logged in.");
      return;
    }
  
    try {
      const response = await axios({
        method: 'PUT',
        url: `http://localhost:8000/api/customers/${user.customer_id}`,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        data: {
          customer_address: address,
          customer_age: age
        }
      });
  
      console.log("✅ Update Success:", response.data);
      alert("Profile updated successfully!");
  
      const updatedUser = { ...user, customer_address: address, customer_age: age };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
  
    } catch (error) {
      console.error("❌ Axios Error (catch):", error.message);
      alert("An error occurred while updating profile: " + (error.response?.data?.message || error.message));
    }
  };
  
  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData)); // Simpan data user ke localStorage
    setUser(userData); // Perbarui state user secara langsung
  };

  const toggleSidebar = () => {
    setIsOpen((prev) => {
      const newState = !prev;
      document.body.style.overflow = newState ? "hidden" : "unset";
      return newState;
    });
  };

  const toggleProfileSidebar = () => {
    setIsProfileOpen((prev) => {
      const newState = !prev;
      document.body.style.overflow = newState ? "hidden" : "unset";
      return newState;
    });
  };

  const toggleSettingsDropdown = () => {
    setIsSettingsOpen((prev) => !prev);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/Catalog?search=${encodeURIComponent(searchTerm.trim())}`);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Navbar utama */}
      <nav className="bg-[#151523] shadow-lg py-3 px-10 flex items-center justify-between rounded-full mx-24 mt-5 mb-5 backdrop-blur-md border border-gray-700">
        {/* Sidebar button */}
        <div>
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

        {/* Logo */}
        <div className="flex items-center ml-12 mr-14">
          <Link to="/">
            <img src="/Logo CLOVIO.svg" alt="Logo CLOVIO" className="h-10 w-auto" />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-64 relative ml-12">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#151523]" size={20} />
          <input
             type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="w-full p-2 pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Cart + Profile */}
        <div className="flex items-center space-x-8">
          <Link to="/cart" className="text-white hover:text-blue-600 transition-colors">
            <FaShoppingCart size={22} />
          </Link>

          <div>
            {user ? (
              <button
                onClick={toggleProfileSidebar}
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
            ) : (
              <Link to="/login" className="text-white hover:text-blue-600 transition-colors">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar Profile */}
      {isProfileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleProfileSidebar}
          />
          <div className="fixed top-0 right-0 h-full w-80 bg-[#151523] z-50 transform transition-transform duration-300">
            <div className="p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-white text-lg font-semibold">Profile</h2>
                <IoClose
                  size={24}
                  className="text-white hover:text-blue-600 cursor-pointer"
                  onClick={toggleProfileSidebar}
                />
              </div>

              <div className="mb-8">
                <p className="text-[#FFF8E8] font-medium">{user?.customer_name}</p>
                <p className="text-gray-400 text-sm">{user?.customer_email}</p>
              </div>

              <div className="mb-8">
                <h3
                  className="text-white text-lg font-semibold mb-4 cursor-pointer"
                  onClick={toggleSettingsDropdown}
                >
                  Settings
                </h3>
                {isSettingsOpen && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Address</label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your address"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Umur</label>
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="Enter your age"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                      <button
                        onClick={handleSaveProfile}
                        className="w-full text-left mb-4 px-4 py-2 text-[#151523] bg-[#FFF8E8] hover:bg-blue-600 hover:text-[#FFF8E8]"
                      >
                        Save
                      </button>
                  </div>
                )}
              </div>
              {/* Tambahkan Tombol Receipts */}
              <button
                onClick={() => {
                  toggleProfileSidebar();
                  navigate('/Receipt');
                }}
                className="w-full text-left mb-4 px-4 py-2 text-[#151523] bg-[#FFF8E8] hover:bg-blue-600 hover:text-[#FFF8E8]"
              >
                Receipts
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left mt-36 px-4 py-2 text-[#151523] bg-[#FFF8E8] hover:bg-blue-600 hover:text-[#FFF8E8]"
              >
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}

      {/* Background hitam kalau sidebar kebuka */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleSidebar} />
      )}

      {/* Sidebar */}
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
