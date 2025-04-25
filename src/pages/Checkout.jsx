import { useLocation } from 'react-router-dom';

const Checkout = () => {
    const location = useLocation();
    const { cartItems, totalPrice } = location.state || { cartItems: [], totalPrice: 0 };

    return (
        <div className="min-h-screen bg-[#FFF8E8] p-8">
            <div className="max-w-7xl mx-auto flex gap-8 relative">
                {/* Left Section */}
                <div className="w-2/3 bg-[#151523] text-[#FFF8E8] p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold mb-6">Payment</h2>
                    
                    {/* Payment Method */}
                    <div className="flex gap-2 mb-6">
                        <button className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 text-[#FFF8E8]">
                            BCA
                        </button>
                        <button className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 text-[#FFF8E8]">
                            BRI
                        </button>
                        <button className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 text-[#FFF8E8]">
                            E-Wallet
                        </button>
                    </div>

                    {/* Shipping Address */}
                    <div className="space-y-4 mb-6">
                        <h3 className="text-lg font-semibold text-[#FFF8E8]">Shipping Address</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <input 
                                type="text" 
                                placeholder="First Name"
                                className="bg-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#FFF8E8] placeholder-gray-400"
                            />
                            <input 
                                type="text" 
                                placeholder="Last Name"
                                className="bg-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#FFF8E8] placeholder-gray-400"
                            />
                        </div>
                        <input 
                            type="text" 
                            placeholder="Address Line 1"
                            className="w-full bg-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#FFF8E8] placeholder-gray-400"
                        />
                        <input 
                            type="text" 
                            placeholder="Address Line 2"
                            className="w-full bg-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#FFF8E8] placeholder-gray-400"
                        />
                        <div className="grid grid-cols-3 gap-4">
                            <input 
                                type="text" 
                                placeholder="City"
                                className="bg-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#FFF8E8] placeholder-gray-400"
                            />
                            <input 
                                type="text" 
                                placeholder="Province"
                                className="bg-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#FFF8E8] placeholder-gray-400"
                            />
                            <input 
                                type="text" 
                                placeholder="ZIP Code"
                                className="bg-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#FFF8E8] placeholder-gray-400"
                            />
                        </div>
                    </div>

                    {/* Shipping Method */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-[#FFF8E8]">Shipping Method</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between bg-gray-700 p-4 rounded-lg text-[#FFF8E8] cursor-pointer hover:bg-gray-600 transition-colors duration-300">
                                <span>Regular</span>
                                <span>Rp 20.000</span>
                            </div>
                            <div className="flex justify-between bg-gray-700 p-4 rounded-lg text-[#FFF8E8] cursor-pointer hover:bg-gray-600 transition-colors duration-300">
                                <span>Express</span>
                                <span>Rp 40.000</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section - Summary */}
                <div className="w-1/3">
                    <div className="sticky top-8 bg-[#151523] text-[#FFF8E8] p-8 rounded-2xl">
                        <h2 className="text-2xl font-bold mb-6">SUMMARY</h2>
                        
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Subtotal</span>
                                <span className="text-[#FFF8E8]">Rp. {totalPrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Shipping</span>
                                <span className="text-[#FFF8E8]">Rp. 0.00</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Sales Tax</span>
                                <span className="text-[#FFF8E8]">Rp. 0.00</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-700 pt-4 mb-6">
                            <div className="flex justify-between font-bold text-[#FFF8E8]">
                                <span>Estimated Total</span>
                                <span>Rp. {totalPrice}</span>
                            </div>
                        </div>

                        <button className="w-full bg-[#FFF8E8] text-[#151523] py-4 rounded-lg font-bold mb-6 hover:bg-gray-200 transition-colors">
                            PLACE ORDER →
                        </button>

                        <div className="text-center text-sm text-gray-400">
                            Need help? Call us at 0-8123-456-789
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
