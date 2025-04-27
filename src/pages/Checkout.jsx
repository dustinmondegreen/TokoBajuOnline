import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems, totalPrice } = location.state || { cartItems: [], totalPrice: 0 };

    const [user, setUser] = useState({});
    const [address, setAddress] = useState('');
    const [shippingMethod, setShippingMethod] = useState({ name: '', price: 0 });
    const [paymentMethod, setPaymentMethod] = useState('');

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
            setAddress(storedUser.customer_address || '');
        }
    }, []);

    const handleShippingSelect = (methodName, methodPrice) => {
        setShippingMethod({ name: methodName, price: methodPrice });
    };

    const handlePlaceOrder = async () => {
        try {
            const today = new Date();
            const orderDate = today.toISOString().split('T')[0]; // format: YYYY-MM-DD
            const deliveryDate = new Date(today);
            deliveryDate.setDate(today.getDate() + 2); // tambah 2 hari
            const deliveryDateFormatted = deliveryDate.toISOString().split('T')[0]; // format: YYYY-MM-DD
    
            // Hit Order API
            const orderResponse = await axios.post('http://localhost:8000/api/orders', {
                customer_id: user.customer_id,
                shipping_address: address,
                items: cartItems.map(item => ({
                    product_id: item.itemNo,
                    quantity: item.quantity,
                })),
                order_date: orderDate,
                delivery_date: deliveryDateFormatted,
                order_status: 'Processing'
            });
    
            const orderId = orderResponse.data.order.order_id;
    
            // Hit Payment API
            await axios.post('http://localhost:8000/api/payments', {
                order_id: orderId,
                payment_method: paymentMethod,
                payment_status: 'Paid',
                payment_date: orderDate,
            });
    
            alert('✅ Order and Payment placed successfully!');
            navigate(`/receipt/${orderId}`);
    
        } catch (error) {
            console.error('❌ Failed to place order or payment:', error);
            alert('Failed to place order. Please try again.');
        }
    };

    const grandTotal = totalPrice + shippingMethod.price;

    const handlePaymentSelect = (method) => {
        setPaymentMethod(method);
    };

    return (
        <div className="min-h-screen bg-[#FFF8E8] p-8">
            <div className="max-w-7xl mx-auto flex gap-8 relative">
                {/* Left Section */}
                <div className="w-2/3 bg-[#151523] text-[#FFF8E8] p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold mb-6">Payment</h2>
                    
                    <div className="flex gap-2 mb-6">
                        {[
                            { label: 'BCA', value: 'virtual_account' },
                            { label: 'BRI', value: 'bank' },
                            { label: 'E-Wallet', value: 'e_wallet' }
                        ].map(({ label, value }) => (
                            <button
                                key={value}
                                onClick={() => handlePaymentSelect(value)}
                                className={`px-4 py-2 rounded-lg text-[#FFF8E8] ${paymentMethod === value ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Shipping Address */}
                    <div className="space-y-4 mb-6">
                        <h3 className="text-lg font-semibold text-[#FFF8E8]">Shipping Address</h3>
                        <div className="grid grid-cols-2 gap-4">
                        <input
                                type="text"
                                value={user.customer_name || ''}
                                disabled
                                className="w-full bg-gray-600 p-3 rounded-lg mb-2 text-[#FFF8E8] placeholder-gray-400"
                            />
                        </div>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Address Line"
                            className="w-full bg-gray-700 p-3 rounded-lg text-[#FFF8E8] placeholder-gray-400"
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
                            {[
                                { name: 'Regular', price: 20000 },
                                { name: 'Express', price: 40000 }
                            ].map((method) => (
                                <div
                                    key={method.name}
                                    className={`flex justify-between bg-gray-700 p-4 rounded-lg cursor-pointer ${shippingMethod.name === method.name ? 'bg-blue-600' : 'hover:bg-gray-600'}`}
                                    onClick={() => handleShippingSelect(method.name, method.price)}
                                >
                                    <span>{method.name}</span>
                                    <span>Rp {method.price.toLocaleString()}</span>
                                </div>
                            ))}
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
                                <span className="text-[#FFF8E8]">Rp. {totalPrice.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Shipping ({shippingMethod.name || '-'})</span>
                                <span className="text-[#FFF8E8]">Rp. {shippingMethod.price.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Sales Tax</span>
                                <span className="text-[#FFF8E8]">Rp. 0.00</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-700 pt-4 mb-6">
                            <div className="flex justify-between font-bold text-[#FFF8E8]">
                                <span>Estimated Total</span>
                                <span>Rp. {grandTotal.toLocaleString()}</span>
                            </div>
                        </div>

                        <button 
                            onClick={handlePlaceOrder}
                            className="w-full bg-[#FFF8E8] text-[#151523] py-4 rounded-lg font-bold mb-6 hover:bg-gray-200 transition-colors">
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
