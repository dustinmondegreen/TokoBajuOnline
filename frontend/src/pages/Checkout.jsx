import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems, totalPrice } = location.state || { cartItems: [], totalPrice: 0 };

    const [user, setUser] = useState({});
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [zipCode, setZipCode] = useState('');
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
        if (!user.customer_id) {
            alert("User not logged in.");
            navigate('/login');
            return;
        }
        if (!address || !city || !province || !zipCode) {
            alert("Please fill in all shipping address details (Address Line, City, Province, ZIP Code).");
            return;
        }
        if (!shippingMethod.name) {
            alert("Please select a shipping method.");
            return;
        }
        if (!paymentMethod) {
            alert("Please select a payment method.");
            return;
        }
        if (cartItems.length === 0) {
            alert("Your cart is empty. Please add items before checking out.");
            navigate('/cart');
            return;
        }

        try {
            const today = new Date();
            const orderDate = today.toISOString().split('T')[0];
            const deliveryDate = new Date(today);
            deliveryDate.setDate(today.getDate() + 2);
            const deliveryDateFormatted = deliveryDate.toISOString().split('T')[0];
            const fullShippingAddress = `${address}, ${city}, ${province}, ${zipCode}`;

            const orderResponse = await axios.post('http://localhost:8000/api/orders', {
                customer_id: user.customer_id,
                shipping_address: address, 
                items: cartItems.map(item => ({
                    product_id: item.itemNo,
                    quantity: item.quantity,
                    size: item.size 
                })),
                total_amount: grandTotal,
                shipping_method: shippingMethod.name,
                order_date: orderDate,
                delivery_date: deliveryDateFormatted,
                order_status: 'Processing'
            });

            const orderId = orderResponse.data.order.order_id;

            await axios.post('http://localhost:8000/api/payments', {
                order_id: orderId,
                payment_method: paymentMethod,
                payment_status: 'Paid',
                payment_date: orderDate,
                amount: grandTotal
            });

            alert('✅ Order and Payment placed successfully!');
            navigate(`/receipt/${orderId}`);

        } catch (error) {
            console.error('❌ Failed to place order or payment:', error);
            let errorMessage = 'An unexpected error occurred.';
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.data && error.response.data.error && error.response.data.error.payment_method) {
                    errorMessage = error.response.data.error.payment_method.join(', ');
                } else if (error.response.data && error.response.data.message) {
                    errorMessage = error.response.data.message;
                } else if (error.response.data) {
                    errorMessage = JSON.stringify(error.response.data);
                } else {
                    errorMessage = `Server responded with status: ${error.response.status}`;
                }
            } else if (error.request) {
                errorMessage = 'No response from server. Please check your network connection.';
            } else {
                errorMessage = error.message;
            }
            alert(`Failed to place order. Please try again. Details: ${errorMessage}`);
        }
    };

    const grandTotal = totalPrice + shippingMethod.price;

    const handlePaymentSelect = (method) => {
        setPaymentMethod(method);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-jakarta mt-14">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
                <div className="lg:w-2/3 bg-white p-10 rounded-2xl shadow-lg border border-gray-200">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">Checkout</h2>

                    <section className="mb-10">
                        <h3 className="text-xl font-semibold text-gray-800 mb-5">Select Payment Method</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { label: 'BCA', value: 'BCA' },
                                { label: 'BRI', value: 'BRI' },  
                                { label: 'Mandiri', value: 'Mandiri' }  
                            ].map(({ label, value }) => (
                                <button
                                    key={value}
                                    onClick={() => handlePaymentSelect(value)}
                                    className={`px-6 py-4 rounded-xl border-2 transition-all duration-300 ease-in-out
                                        ${paymentMethod === value
                                            ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                                            : 'bg-white border-gray-300 text-gray-800 hover:border-blue-500 hover:bg-blue-50'
                                        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </section>

                    <section className="mb-10">
                        <h3 className="text-xl font-semibold text-gray-800 mb-5">Shipping Address</h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                value={user.customer_name || ''}
                                disabled
                                className="w-full bg-gray-100 p-4 rounded-xl text-gray-700 placeholder-gray-500 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Full Name"
                            />
                            <input
                                type="email"
                                value={user.customer_email || ''}
                                disabled
                                className="w-full bg-gray-100 p-4 rounded-xl text-gray-700 placeholder-gray-500 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Email"
                            />
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Address Line (Street, House Number)"
                                className="w-full bg-white p-4 rounded-xl text-gray-800 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder="City"
                                    className="bg-white p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500"
                                />
                                <input
                                    type="text"
                                    value={province}
                                    onChange={(e) => setProvince(e.target.value)}
                                    placeholder="Province"
                                    className="bg-white p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500"
                                />
                                <input
                                    type="text"
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                    placeholder="ZIP Code"
                                    className="bg-white p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500"
                                />
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xl font-semibold text-gray-800 mb-5">Select Shipping Method</h3>
                        <div className="space-y-3">
                            {[
                                { name: 'Standard Delivery', price: 20000, description: 'Estimated 3-5 business days' },
                                { name: 'Express Delivery', price: 40000, description: 'Estimated 1-2 business days' }
                            ].map((method) => (
                                <div
                                    key={method.name}
                                    className={`flex items-center justify-between p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 ease-in-out
                                        ${shippingMethod.name === method.name
                                            ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                                            : 'bg-white border-gray-300 text-gray-800 hover:border-blue-500 hover:bg-blue-50'
                                        }`}
                                    onClick={() => handleShippingSelect(method.name, method.price)}
                                >
                                    <div>
                                        <span className="font-semibold text-lg">{method.name}</span>
                                        <p className={`${shippingMethod.name === method.name ? 'text-blue-200' : 'text-gray-500'} text-sm`}>
                                            {method.description}
                                        </p>
                                    </div>
                                    <span className="font-semibold text-lg">Rp {method.price.toLocaleString('id-ID')}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="lg:w-1/3">
                    <div className="sticky top-24 bg-white p-10 rounded-2xl shadow-lg border border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">Order Summary</h2>

                        <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                            {cartItems.length > 0 ? (
                                cartItems.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center pb-2 border-b border-gray-100 last:border-b-0">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={item.image && item.image.startsWith('/storage/') ? `http://localhost:8000${item.image}` : item.image}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded-md"
                                            />
                                            <div>
                                                <p className="font-medium text-gray-800">{item.name}</p>
                                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                                            </div>
                                        </div>
                                        <span className="font-semibold text-gray-800">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">Your cart is empty.</p>
                            )}
                        </div>

                        <div className="space-y-4 mb-6 border-t border-gray-200 pt-6">
                            <div className="flex justify-between text-gray-700">
                                <span>Subtotal</span>
                                <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between text-gray-700">
                                <span>Shipping ({shippingMethod.name || 'Not selected'})</span>
                                <span>Rp {shippingMethod.price.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between text-gray-700">
                                <span>Sales Tax</span>
                                <span>Rp 0</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-300 pt-6 mb-8">
                            <div className="flex justify-between font-bold text-2xl text-gray-900">
                                <span className='font-light'>Estimated Total</span>
                                <span>Rp {grandTotal.toLocaleString('id-ID')}</span>
                            </div>
                        </div>

                        <button
                            onClick={handlePlaceOrder}
                            disabled={!paymentMethod || !shippingMethod.name || !address || !city || !province || !zipCode || cartItems.length === 0}
                            className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ease-in-out
                                ${(!paymentMethod || !shippingMethod.name || !address || !city || !province || !zipCode || cartItems.length === 0)
                                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                        >
                            PLACE ORDER →
                        </button>

                        <div className="text-center text-sm text-gray-500 mt-6">
                            Need Help? Call us at 0812 3456 7890
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;