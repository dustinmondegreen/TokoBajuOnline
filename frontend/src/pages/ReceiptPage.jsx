import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReceiptPage = () => {
    const navigate = useNavigate();
    const [receipts, setReceipts] = useState([]);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.customer_id) {
            setUser(storedUser);
            fetchReceipts(storedUser.customer_id);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const fetchReceipts = async (customerId) => {
        setLoading(true);
        setError(null);
        try {
            const ordersResponse = await axios.get('http://localhost:8000/api/orders');
            const paymentsResponse = await axios.get('http://localhost:8000/api/payments');

            const userOrders = ordersResponse.data.filter(order => order.customer_id === customerId);
            const allPayments = paymentsResponse.data.payments || [];

            const mergedReceipts = userOrders.map(order => {
                const payment = allPayments.find(p => p.order_id === order.order_id);
                return {
                    ...order,
                    payment_method: payment?.payment_method || 'N/A',
                    payment_status: payment?.payment_status || 'N/A',
                    delivery_date: order.delivery_date || 'N/A',
                    items: order.items || []
                };
            });

            mergedReceipts.sort((a, b) => new Date(b.order_date) - new Date(a.order_date));

            setReceipts(mergedReceipts);
        } catch (err) {
            console.error('Failed to fetch receipts:', err);
            setError('Failed to load your past orders. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 font-jakarta">
                <p className="text-lg text-gray-700">Loading your receipts...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 font-jakarta">
                <p className="text-lg text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8 font-jakarta mt-14">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-10 text-center tracking-tight">Your Order History</h2>

                {receipts.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-lg border border-gray-200">
                        <p className="text-xl text-gray-600 mb-4">You haven't placed any orders yet.</p>
                        <Link to="/catalog" className="text-blue-600 hover:underline text-lg font-medium">
                            Start Shopping Now
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {receipts.map((receipt, index) => (
                            <div key={receipt.order_id} className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 transition-transform hover:scale-[1.01] duration-200">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4 flex items-center">
                                    <span className="
                                        bg-blue-600 text-white text-base font-semibold
                                        w-10 h-10 flex items-center justify-center
                                        rounded-full mr-3 shrink-0
                                    ">
                                        {index + 1}
                                    </span>
                                    Order ID: <span className="text-blue-600 ml-2">{receipt.order_id}</span>
                                </h3>

                                <div className="space-y-4 text-gray-700 text-base">
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold">Order Date:</span>
                                        <span>{receipt.order_date}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold">Delivery Date:</span>
                                        <span>{receipt.delivery_date}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold">Shipping Address:</span>
                                        <span className="text-right max-w-[60%]">{receipt.shipping_address}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold">Order Status:</span>
                                        <span className={`font-semibold ${receipt.order_status === 'Processing' ? 'text-yellow-600' : 'text-green-600'}`}>
                                            {receipt.order_status}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold">Payment Method:</span>
                                        <span>{receipt.payment_method}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold">Payment Status:</span>
                                        <span className={`font-semibold ${receipt.payment_status === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>
                                            {receipt.payment_status}
                                        </span>
                                    </div>

                                    {receipt.items && receipt.items.length > 0 && (
                                        <>
                                            <div className="border-t border-gray-200 pt-4 mt-6">
                                                <h4 className="text-lg font-semibold text-gray-800 mb-3">Items:</h4>
                                                <ul className="space-y-2">
                                                    {receipt.items.map((item, itemIndex) => (
                                                        <li key={itemIndex} className="flex justify-between text-sm text-gray-600">
                                                            <span>{item.quantity} x {item.product_name || `Product ID: ${item.product_id}`}</span>
                                                            <span>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </>
                                    )}

                                    <div className="border-t-2 border-gray-300 pt-4 mt-6 flex justify-between items-center font-bold text-xl text-gray-900">
                                        <span>Total Paid:</span>
                                        <span>Rp {parseFloat(receipt.total_amount).toLocaleString('id-ID')}</span>
                                    </div>
                                </div>
                                <div className="text-right mt-6">
                                    <Link to={`/receipt/${receipt.order_id}`} className="text-blue-600 hover:underline font-medium text-sm">
                                        View Details →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReceiptPage;