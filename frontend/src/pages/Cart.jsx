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

            // Filter hanya cart yang punya customer_id user yang login
            const customerCart = response.data.data.filter(item => item.customer_id === storedUser.customer_id);

            // Map supaya cocok tampil di frontend
            const mappedCart = customerCart.map(item => ({
                id: item.cart_id,
                name: item.product.product_name,
                itemNo: item.product.product_id,
                color: item.product.color,
                quantity: 1, // default qty 1 (kalau mau nambah qty nanti tinggal tambah field baru)
                price: parseFloat(item.product.price),
                image: item.product.image, // kamu bisa render nanti
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
            alert('🗑️ Item removed from cart');
        } catch (error) {
            console.error('❌ Failed to remove item:', error);
            alert('Failed to remove item');
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
        <div className="flex justify-center p-16 bg-[#FFF8E8] min-h-screen">
            <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">
                {/* Shopping Bag Section */}
                <div className="w-full md:w-2/3 bg-[#151523] p-6 rounded-lg shadow-sm">
                    <h1 className="text-2xl font-bold mb-6 text-[#FFF8E8]">MY SHOPPING BAG</h1>
                    
                    {/* Headers */}
                    <div className="flex justify-between border-b border-gray-700 pb-2 mb-4">
                        <h2 className="font-semibold text-lg w-2/3 text-[#FFF8E8]">PRODUCT</h2>
                        <h2 className="font-semibold text-lg text-right w-1/3 text-[#FFF8E8]">PRICE</h2>
                    </div>

                    {/* Item List */}
                    {cartItems.map((item) => (
                        <div key={item.id} className="border-b border-gray-700 pb-6 mb-6">
                            <div className="flex gap-4">
                                <div className="w-24 h-24 bg-gray-700 rounded">
                                <img 
                                    src={item.image.startsWith('/storage/') ? `http://localhost:8000${item.image}` : item.image} 
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-[#FFF8E8]">{item.name}</h3>
                                    <div className="text-sm text-gray-400 mt-1">
                                        <p>Item No: {item.itemNo}</p>
                                        <p>Size: {item.size}</p>
                                        <p>Color: {item.color}</p>
                                        {editingItemId === item.id ? (
                                            <div className="flex items-center gap-2 mt-1">
                                                <label htmlFor="qty" className="text-[#FFF8E8] text-xs">Qty:</label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={newQuantity}
                                                    onChange={(e) => setNewQuantity(parseInt(e.target.value))}
                                                    className="w-16 p-1 rounded bg-gray-600 text-white text-xs"
                                                />
                                            </div>
                                        ) : (
                                            <p>Qty: {item.quantity}</p>
                                        )}
                                    </div>
                                    <div className="flex gap-4 mt-3">
                                        {editingItemId === item.id ? (
                                            <button 
                                                onClick={() => handleSaveEdit(item.id)}
                                                className="text-green-400 hover:text-green-300 text-sm font-medium"
                                            >
                                                SAVE
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={() => handleEditClick(item.id, item.quantity)}
                                                className="text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                                            >
                                                EDIT
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => handleRemove(item.id)}
                                            className="text-red-400 hover:text-red-300 text-sm font-medium"
                                        >
                                            REMOVE
                                        </button>
                                    </div>
                                </div>
                                <div className="w-1/3 text-right">
                                    <p className="font-semibold text-[#FFF8E8]">Rp. {item.price.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary Section */}
                <div className="w-full md:w-1/3 bg-[#151523] p-6 rounded-lg shadow-sm h-fit sticky top-6">
                    <h1 className="text-2xl font-bold mb-4 text-[#FFF8E8]">SUMMARY</h1>
                    <hr className="border-gray-700 my-2" />

                    <div className="space-y-3 mb-4">
                        <div className="flex justify-between">
                            <p className="text-gray-400">Subtotal</p>
                            <p className="font-semibold text-[#FFF8E8]">Rp. {calculateTotal().toLocaleString()}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-400">Shipping</p>
                            <p className="font-semibold text-[#FFF8E8]">Rp. 0</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-400">Sales Tax</p>
                            <p className="font-semibold text-[#FFF8E8]">Rp. 0</p>
                        </div>
                    </div>

                    <hr className="border-gray-700 my-2" />

                    <div className="flex justify-between my-4">
                        <p className="font-bold text-[#FFF8E8]">Estimated Total</p>
                        <p className="font-bold text-lg text-[#FFF8E8]">Rp. {calculateTotal().toLocaleString()}</p>
                    </div>

                    <hr className="border-gray-700 my-2" />

                    <button 
                        onClick={handleCheckout}
                        className="w-full bg-[#FFF8E8] text-[#151523] font-bold py-3 rounded-lg hover:bg-gray-200 transition duration-300 mt-6 mb-4"
                    >
                        CHECKOUT
                    </button>

                    <p className="text-center text-gray-400 text-sm">Need Help? Call us at 888</p>
                </div>
            </div>
        </div>
    );
};

export default Cart;