import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();
    const [cartItems] = useState([
        {
            id: 1,
            name: "BATMAN T-SHIRT SUPERHERO",
            itemNo: "894985949485",
            size: "XL",
            color: "Sky Blue",
            quantity: 1,
            price: 1500000,
            image: "/path-to-image.jpg"
        }
    ]);

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
                                <div className="w-24 h-24 bg-gray-700 rounded"></div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-[#FFF8E8]">{item.name}</h3>
                                    <div className="text-sm text-gray-400 mt-1">
                                        <p>Item No: {item.itemNo}</p>
                                        <p>Size: {item.size}</p>
                                        <p>Color: {item.color}</p>
                                        <p>Qty: {item.quantity}</p>
                                    </div>
                                    <div className="flex gap-4 mt-3">
                                        <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">EDIT</button>
                                        <button className="text-red-400 hover:text-red-300 text-sm font-medium">REMOVE</button>
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