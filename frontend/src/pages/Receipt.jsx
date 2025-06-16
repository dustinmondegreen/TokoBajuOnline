import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const OrderDetailsPage = () => {
    const navigate = useNavigate();
    const { orderId } = useParams();

    const [singleReceipt, setSingleReceipt] = useState(null);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.customer_id) {
            setUser(storedUser);
            fetchSingleReceipt(storedUser.customer_id, orderId);
        } else {
            navigate('/login');
        }
    }, [navigate, orderId]);

    const fetchSingleReceipt = async (customerId, currentOrderId) => {
        setLoading(true);
        setError(null);
        try {
            const ordersResponse = await axios.get('http://localhost:8000/api/orders');
            const paymentsResponse = await axios.get('http://localhost:8000/api/payments');

            const order = ordersResponse.data.find(o => o.order_id === currentOrderId && o.customer_id === customerId);

            if (!order) {
                setError('Order not found or does not belong to you.');
                setLoading(false);
                return;
            }

            const payment = paymentsResponse.data.payments.find(p => p.order_id === order.order_id);

            setSingleReceipt({
                ...order,
                payment_method: payment?.payment_method || 'N/A',
                payment_status: payment?.payment_status || 'N/A',
                delivery_date: order.delivery_date || 'N/A',
                items: order.items || []
            });
        } catch (err) {
            console.error(`Failed to fetch receipt for order ID ${currentOrderId}:`, err);
            setError(`Failed to load details for order ID ${currentOrderId}. Please try again.`);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 font-jakarta">
                <p className="text-lg text-gray-700">Loading order details...</p>
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

    const receipt = singleReceipt;
    return (
        <div className="min-h-screen bg-gray-50 p-8 font-jakarta mt-14">
            <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-lg border border-gray-200">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">
                    Order Details
                </h2>
                <p className="text-center text-gray-600 mb-8">
                    Order ID: <span className="text-blue-600 font-bold">{receipt.order_id}</span>
                </p>

                <div className="space-y-4 text-gray-700 text-base mb-8">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="font-semibold">Order Date:</span>
                        <span>{receipt.order_date}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="font-semibold">Delivery Date:</span>
                        <span>{receipt.delivery_date}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="font-semibold">Shipping Address:</span>
                        <span className="text-right max-w-[60%]">{receipt.shipping_address}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="font-semibold">Order Status:</span>
                        <span className={`font-semibold ${receipt.order_status === 'Processing' ? 'text-yellow-600' : 'text-green-600'}`}>
                            {receipt.order_status}
                        </span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="font-semibold">Payment Method:</span>
                        <span>{receipt.payment_method}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="font-semibold">Payment Status:</span>
                        <span className={`font-semibold ${receipt.payment_status === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>
                            {receipt.payment_status}
                        </span>
                    </div>

                    {receipt.items && receipt.items.length > 0 && (
                        <div className="border-t border-gray-200 pt-4 mt-6">
                            <h4 className="text-xl font-semibold text-gray-900 mb-4">Items Ordered:</h4>
                            <ul className="space-y-3">
                                {receipt.items.map((item, index) => (
                                    <li key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-800">{item.product_name || `Product ID: ${item.product_id}`}</p>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                            {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                                        </div>
                                        <span className="font-semibold text-gray-800">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="border-t-2 border-gray-300 pt-6 mt-6 flex justify-between items-center font-bold text-2xl text-gray-900">
                    <span>Total Paid:</span>
                    <span>Rp {parseFloat(receipt.total_amount).toLocaleString('id-ID')}</span>
                </div>

                <div className="text-center mt-10">
                    <Link to="/receipt" className="text-blue-600 hover:underline font-medium text-lg">
                        Back to All Orders
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsPage;