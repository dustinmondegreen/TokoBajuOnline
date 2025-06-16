import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left mb-8 md:mb-0">
                    <Link to="/">
                        <img src="/Logo CLOVIO 1.svg" alt="CLOVIO Logo" className="h-10 mb-4" />
                    </Link>
                    <p className="text-sm">
                        Your ultimate destination for modern fashion.
                    </p>
                </div>

                <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8 text-center md:text-left">
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4 uppercase tracking-wide">Products</h3>
                        <ul className="space-y-2">
                            <li><Link to="/catalog" className="hover:text-white transition-colors text-sm">Catalog</Link></li>
                            <li><Link to="/catalog?type=T-Shirt" className="hover:text-white transition-colors text-sm">T-Shirts</Link></li>
                            <li><Link to="/catalog?type=Hoodie" className="hover:text-white transition-colors text-sm">Hoodies</Link></li>
                            <li><Link to="/catalog?type=Jacket" className="hover:text-white transition-colors text-sm">Jackets</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4 uppercase tracking-wide">Company</h3>
                        <ul className="space-y-2">
                            <li><Link to="/about" className="hover:text-white transition-colors text-sm">About Us</Link></li>
                            <li><Link to="/careers" className="hover:text-white transition-colors text-sm">Careers</Link></li>
                            <li><Link to="/blog" className="hover:text-white transition-colors text-sm">Blog</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4 uppercase tracking-wide">Support</h3>
                        <ul className="space-y-2">
                            <li><Link to="/faq" className="hover:text-white transition-colors text-sm">FAQ</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors text-sm">Contact Us</Link></li>
                            <li><Link to="/returns" className="hover:text-white transition-colors text-sm">Returns</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="md:col-span-1 flex flex-col items-center md:items-end text-center md:text-right">
                    <h3 className="text-white text-lg font-semibold mb-4 uppercase tracking-wide">Stay Connected</h3>
                    <div className="flex space-x-4 mb-6">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <FaFacebookF size={24} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <FaInstagram size={24} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <FaTwitter size={24} />
                        </a>
                        <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                            <FaWhatsapp size={24} />
                        </a>
                    </div>
                    <p className="text-sm mb-4">Subscribe to our newsletter for updates:</p>
                    <div className="flex w-full max-w-xs">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="flex-grow p-2 text-sm bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:border-blue-500"
                        />
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors text-sm">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-12 pt-8 text-center text-xs text-gray-500">
                <p>&copy; {new Date().getFullYear()} CLOVIO. All Rights Reserved. GDGH 2025.</p>
                <div className="mt-2 space-x-4">
                    <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;