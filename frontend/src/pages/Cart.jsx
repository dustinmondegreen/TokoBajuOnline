import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [editingItemId, setEditingItemId] = useState(null);
    const [newQuantity, setNewQuantity] = useState(1);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            const response = await axios.get('http://localhost:8000/api/cart');

            const customerCart = response.data.data.filter(item => item.customer_id === storedUser.customer_id);

            const mappedCart = customerCart.map(item => ({
                id: item.cart_id,
                name: item.product.product_name,
                itemNo: item.product.product_id,
                color: item.product.color,
                quantity: 1,
                price: parseFloat(item.product.price),
                image: item.product.image,
            }));

            setCartItems(mappedCart);

        } catch (error) {
            console.error('❌ Failed to fetch cart:', error);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleCheckout = () => {
        navigate('/checkout', {
            state: {
                cartItems: cartItems,
                totalPrice: calculateTotal(),
            }
        });
    };

    const handleRemove = async (cartId) => {
        try {
            await axios.delete(`http://localhost:8000/api/cart/${cartId}`);
            setCartItems(prev => prev.filter(item => item.id !== cartId));
        } catch (error) {
            console.error('❌ Failed to remove item:', error);
        }
    };

    const handleEditClick = (itemId, currentQty) => {
        setEditingItemId(itemId);
        setNewQuantity(currentQty);
    };

    const handleSaveEdit = (itemId) => {
        setCartItems(prev => prev.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item));
        setEditingItemId(null);
    };

    return (
        <div className="flex justify-center p-8 bg-gray-50 min-h-screen font-jakarta mt-14">
            <div className="flex flex-col md:flex-row gap-10 w-full max-w-6xl">
                <div className="w-full md:w-2/3 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                    <h1 className="text-3xl font-medium text-gray-900 mb-8 tracking-tight">Your Shopping Bag</h1>

                    <div className="hidden md:flex justify-between border-b border-gray-200 pb-4 mb-6 text-gray-600 font-semibold text-sm uppercase">
                        <h2 className="w-2/5">Product Details</h2>
                        <h2 className="w-1/5 text-center">Price</h2>
                        <h2 className="w-1/5 text-center">Quantity</h2>
                        <h2 className="w-1/5 text-right">Total</h2>
                    </div>

                    {cartItems.length === 0 ? (
                        <div className="text-center py-12 text-gray-600">
                            <p className="text-lg mb-4">Your shopping bag is empty.</p>
                            <Link to="/catalog" className="text-blue-600 hover:underline font-medium">
                                Continue Shopping
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex flex-col md:flex-row items-center justify-between border-b border-gray-100 pb-6">
                                    <div className="flex items-center gap-6 w-full md:w-2/5 mb-4 md:mb-0">
                                        <img
                                            src={item.image.startsWith('/storage/') ? `http://localhost:8000${item.image}` : item.image}
                                            alt={item.name}
                                            className="w-28 h-28 object-cover rounded-lg shadow-sm"
                                        />
                                        <div>
                                            <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
                                            <p className="text-sm text-gray-500">Item No: {item.itemNo}</p>
                                            {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                                            <p className="text-sm text-gray-500">Color: {item.color}</p>
                                            <div className="flex gap-4 mt-3">
                                                {editingItemId === item.id ? (
                                                    <button
                                                        onClick={() => handleSaveEdit(item.id)}
                                                        className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
                                                    >
                                                        Save
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleEditClick(item.id, item.quantity)}
                                                        className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleRemove(item.id)}
                                                    className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full md:w-1/5 text-center text-lg font-medium text-gray-800 mb-2 md:mb-0">
                                        Rp {item.price.toLocaleString('id-ID')}
                                    </div>

                                    <div className="w-full md:w-1/5 flex justify-center items-center mb-4 md:mb-0">
                                        {editingItemId === item.id ? (
                                            <input
                                                type="number"
                                                min="1"
                                                value={newQuantity}
                                                onChange={(e) => setNewQuantity(parseInt(e.target.value))}
                                                className="w-20 p-2 rounded-md border border-gray-300 text-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        ) : (
                                            <span className="text-lg font-medium text-gray-800">{item.quantity}</span>
                                        )}
                                    </div>

                                    <div className="w-full md:w-1/5 text-right text-xl font-semibold text-gray-900">
                                        Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="w-full md:w-1/3 bg-white p-8 rounded-xl shadow-lg border border-gray-200 h-fit sticky top-24">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                    <hr className="border-gray-200 my-4" />

                    <div className="space-y-4 mb-6">
                        <div className="flex justify-between text-gray-700">
                            <span>Subtotal</span>
                            <span>Rp {calculateTotal().toLocaleString('id-ID')}</span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                            <span>Shipping</span>
                            <span>Rp 0</span>
                        </div>
                        <div className="flex justify-between text-gray-700">
                            <span>Sales Tax</span>
                            <span>Rp 0</span>
                        </div>
                    </div>

                    <hr className="border-gray-300 my-4" />

                    <div className="flex justify-between my-6">
                        <p className="font-bold text-xl text-gray-900">Estimated Total</p>
                        <p className="font-bold text-xl text-gray-900">Rp {calculateTotal().toLocaleString('id-ID')}</p>
                    </div>

                    <button
                        onClick={handleCheckout}
                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300
                            ${cartItems.length === 0
                                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                            }`}
                        disabled={cartItems.length === 0}
                    >
                        CHECKOUT →
                    </button>

                    <Link to="/catalog" className="block text-center text-blue-600 hover:underline mt-6 text-sm font-medium">
                        Continue Shopping
                    </Link>

                    <p className="text-center text-gray-500 text-sm mt-8">Need Help? Call us at 0812 3456 7890</p>
                </div>
            </div>
        </div>
    );
};

export default Cart;