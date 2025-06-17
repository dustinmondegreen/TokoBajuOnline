import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Keep useLocation if you use it elsewhere
import { FaShoppingCart, FaSearch, FaUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import axios from "axios";

// Removed productItems as direct category links are no longer needed in Navbar

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);
    const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [address, setAddress] = useState("");
    const [age, setAge] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const location = useLocation(); // Retaining useLocation in case other parts of your app use it

    const profileSidebarRef = useRef(null);
    const settingsDropdownRef = useRef(null);

    useEffect(() => {
        const checkUser = () => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);
                    setAddress(parsedUser.customer_address || "");
                    setAge(parsedUser.customer_age || ""); 
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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileSidebarRef.current && !profileSidebarRef.current.contains(event.target)) {
                const profileIconButton = document.getElementById('profile-icon-button');
                if (profileIconButton && profileIconButton.contains(event.target)) {
                    return;
                }
                setIsProfileSidebarOpen(false);
                document.body.style.overflow = "unset";
            }
            if (settingsDropdownRef.current && !settingsDropdownRef.current.contains(event.target)) {
                setIsSettingsDropdownOpen(false);
            }
        };

        if (isProfileSidebarOpen || isSettingsDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isProfileSidebarOpen, isSettingsDropdownOpen]);


    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        setIsProfileSidebarOpen(false);
        navigate("/");
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

            console.log("Update Success:", response.data);
            alert("Profile updated successfully!");

            const updatedUser = { ...user, customer_address: address, customer_age: age };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);
            setIsSettingsDropdownOpen(false);
        } catch (error) {
            console.error("Axios Error (catch):", error.message);
            alert("An error occurred while updating profile: " + (error.response?.data?.message || error.message));
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => {
            const newState = !prev;
            document.body.style.overflow = newState ? "hidden" : "unset";
            return newState;
        });
    };

    const toggleProfileSidebar = () => {
        setIsProfileSidebarOpen((prev) => {
            const newState = !prev;
            document.body.style.overflow = newState ? "hidden" : "unset";
            if (newState) setIsSettingsDropdownOpen(false);
            return newState;
        });
    };

    const toggleSettingsDropdown = (e) => {
        e.stopPropagation();
        setIsSettingsDropdownOpen((prev) => !prev);
    };

    // Simplified search: always navigates to Catalog with search param
    const handleSearchKeyDown = (e) => {
        if (e.key === "Enter" && searchTerm.trim()) {
            navigate(`/Catalog?search=${encodeURIComponent(searchTerm.trim())}`);
            setSearchTerm(''); // Clear search term after navigation
        }
    };

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-30 bg-white shadow-sm transition-all duration-300">
                <div className="container mx-auto px-4 lg:px-8 py-3 flex items-center justify-between">
                    <div className="flex items-center lg:hidden">
                        <button
                            onClick={toggleSidebar}
                            className="p-2 -ml-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                            aria-label="Open sidebar"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex-1 lg:flex-none flex justify-center lg:justify-start">
                        <Link to="/" className="flex-shrink-0">
                            <img src="/Logo CLOVIO.svg" alt="Logo CLOVIO" className="h-8 lg:h-9 w-auto" />
                        </Link>
                    </div>

                    <div className="hidden lg:flex items-center space-x-8 xl:space-x-12 ml-auto">
                        <Link
                            to="/catalog"
                            className="text-gray-700 hover:text-blue-600 text-sm font-medium uppercase tracking-wide transition-colors"
                        >
                            Catalog
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4 lg:space-x-6 ml-auto lg:ml-8">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleSearchKeyDown}
                                className="hidden lg:block w-48 p-2 pl-10 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all duration-200"
                            />
                            <FaSearch className="hidden lg:block absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={14} />
                            <button className="lg:hidden text-gray-700 hover:text-gray-900" aria-label="Search">
                                <FaSearch size={18} />
                            </button>
                        </div>

                        <Link to="/cart" className="text-gray-700 hover:text-blue-600 transition-colors" aria-label="Shopping Cart">
                            <FaShoppingCart size={18} />
                        </Link>

                        <div>
                            {user ? (
                                <button
                                    id="profile-icon-button"
                                    onClick={toggleProfileSidebar}
                                    className="text-gray-700 hover:text-blue-600 transition-colors focus:outline-none"
                                    aria-label="User Profile"
                                >
                                    <FaUserCircle size={22} />
                                </button>
                            ) : (
                                <Link to="/login" className="text-gray-700 hover:text-blue-600 text-sm font-medium transition-colors">
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {(isSidebarOpen || isProfileSidebarOpen) && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => {
                        if (isSidebarOpen) toggleSidebar();
                        if (isProfileSidebarOpen) toggleProfileSidebar();
                    }}
                />
            )}

            <div className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-8">
                        <Link to="/" onClick={toggleSidebar}>
                            <img src="/Logo CLOVIO.svg" alt="Logo CLOVIO" className="h-8" />
                        </Link>
                        <button onClick={toggleSidebar} className="text-gray-700 hover:text-gray-900 focus:outline-none" aria-label="Close sidebar">
                            <IoClose size={24} />
                        </button>
                    </div>

                    <div className="mb-8 flex-grow overflow-y-auto">
                        <h2 className="text-gray-800 text-lg font-semibold mb-4 border-b pb-2">Navigation</h2> {/* Changed heading */}
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    to="/catalog"
                                    onClick={toggleSidebar}
                                    className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-base font-medium"
                                >
                                    <span className="mr-3">🛍️</span>
                                    <span>Catalog</span> {/* Changed to general Catalog */}
                                </Link>
                            </li>
                            {/* Removed individual product category links */}
                            <li>
                                <Link
                                    to="/about"
                                    onClick={toggleSidebar}
                                    className="block p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-base font-medium"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    onClick={toggleSidebar}
                                    className="block p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-base font-medium"
                                >
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/faq"
                                    onClick={toggleSidebar}
                                    className="block p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-base font-medium"
                                >
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-200">
                        {!user && (
                            <Link
                                to="/login"
                                onClick={toggleSidebar}
                                className="block w-full text-center bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors"
                            >
                                Sign In
                            </Link>
                        )}
                        {user && (
                             <button
                                 onClick={handleLogout}
                                 className="block w-full text-center bg-gray-200 text-gray-800 px-6 py-3 rounded-md font-semibold hover:bg-gray-300 transition-colors"
                             >
                                 Sign Out
                             </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Profile Sidebar */}
            <div
                ref={profileSidebarRef}
                className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ${isProfileSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="p-6 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-gray-800 text-lg font-semibold">My Account</h2>
                        <button onClick={toggleProfileSidebar} className="text-gray-700 hover:text-gray-900 focus:outline-none" aria-label="Close profile sidebar">
                            <IoClose size={24} />
                        </button>
                    </div>

                    {user ? (
                        <>
                            <div className="mb-8">
                                <p className="text-gray-900 font-bold text-lg">{user.customer_name}</p>
                                <p className="text-gray-600 text-sm">{user.customer_email}</p>
                            </div>

                            <div className="relative mb-6">
                                <button
                                    onClick={toggleSettingsDropdown}
                                    className="w-full text-left py-3 px-4 flex justify-between items-center bg-gray-100 rounded-md text-gray-800 font-medium hover:bg-gray-200 transition-colors"
                                >
                                    <span>Account Settings</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className={`w-5 h-5 transition-transform duration-200 ${isSettingsDropdownOpen ? 'rotate-180' : ''}`}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </button>
                                {isSettingsDropdownOpen && (
                                    <div ref={settingsDropdownRef} className="absolute w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-10 p-4 space-y-4">
                                        <div>
                                            <label className="block text-gray-700 text-sm mb-1">Address</label>
                                            <input
                                                type="text"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                placeholder="Enter your address"
                                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400 text-gray-800"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 text-sm mb-1">Age</label>
                                            <input
                                                type="number"
                                                value={age}
                                                onChange={(e) => setAge(e.target.value)}
                                                placeholder="Enter your age"
                                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400 text-gray-800"
                                            />
                                        </div>
                                        <button
                                            onClick={handleSaveProfile}
                                            className="w-full bg-black text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-800 transition-colors"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                )}
                            </div>

                            <Link
                                to="/receipt"
                                onClick={() => {
                                    toggleProfileSidebar();
                                    setIsSettingsDropdownOpen(false);
                                }}
                                className="block py-3 px-4 bg-gray-100 rounded-md text-gray-800 font-medium hover:bg-gray-200 transition-colors mb-4"
                            >
                                My Orders
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="mt-auto w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-md font-semibold hover:bg-gray-300 transition-colors"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-600 text-center">
                            <p className="mb-4">You are not signed in.</p>
                            <Link
                                to="/login"
                                onClick={toggleProfileSidebar}
                                className="w-full bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors"
                            >
                                Sign In Now
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;