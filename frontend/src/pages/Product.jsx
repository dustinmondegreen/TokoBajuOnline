import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Product = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const productData = location.state?.productData;
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        setIsAuthenticated(!!storedUser);
    }, []);

    if (!productData) {
        navigate('/catalog');
        return null;
    }

    const handleAddToCart = async (e) => {
        e.preventDefault();
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (!storedUser) {
            navigate('/login', {
                state: { from: location.pathname, productData: productData }
            });
            return;
        }

        if (quantity < 1) {
            alert("Quantity must be at least 1.");
            return;
        }

        if (selectedSize === '' && productData.availableSizes && productData.availableSizes.length > 0) {
            alert("Please select a size.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/cart', {
                customer_id: storedUser.customer_id,
                product_id: productData.id,
                quantity: quantity,
                size: selectedSize
            });

            console.log('Product added to cart:', response.data);
            alert('Product added to cart!');
            navigate('/cart');

        } catch (error) {
            console.error('Failed to add to cart:', error);
            alert('Failed to add product to cart.');
        }
    };

    const handleBuyNow = async () => {
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (!storedUser) {
            navigate('/login', {
                state: { from: location.pathname, productData: productData }
            });
            return;
        }

        if (quantity < 1) {
            alert("Quantity must be at least 1.");
            return;
        }

        if (selectedSize === '' && productData.availableSizes && productData.availableSizes.length > 0) {
            alert("Please select a size.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/cart', {
                customer_id: storedUser.customer_id,
                product_id: productData.id,
                quantity: quantity,
                size: selectedSize
            });

            console.log('Product added for direct purchase:', response.data);
            navigate('/checkout');
        } catch (error) {
            console.error('Failed to proceed with purchase:', error);
        }
    };

    return (
        <div className="w-full min-h-screen flex flex-col lg:flex-row bg-white">
            <div className="lg:w-1/2 flex items-center justify-center bg-[#F9F9F9]">
                <img
                    src={productData.image}
                    alt={productData.name}
                    className="object-contain h-full rounded-lg"
                />
            </div>

            <div className="lg:w-1/2 p-8 flex flex-col justify-between mt-24 mx-12">
                <div className="space-y-12">
                    <div className="border-b pb-4">
                        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">{productData.name}</h1>
                        <p className="text-3xl font-semibold text-gray-800">Rp {productData.price}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-700">
                        <div className="space-y-2">
                            <p><span className="font-bold">Color:</span> {productData.color}</p>
                            <p><span className="font-bold">Material:</span> {productData.material}</p>
                        </div>
                        <div className="space-y-2">
                            <p><span className="font-bold">Category:</span>
                                <span className="">{productData.category}</span>
                            </p>
                            <p><span className="font-bold">Availability:</span> {productData.quantity > 0 ? `${productData.quantity} in stock` : 'Out of stock'}</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-gray-800">Product Details</h3>
                        <p className="text-gray-700 leading-relaxed">
                            {productData.description || "A high-quality product crafted with attention to detail. Perfect for any occasion, offering both comfort and style. Made from premium materials for durability."}
                        </p>
                    </div>

                    {productData.availableSizes && productData.availableSizes.length > 0 && (
                        <div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Select Size:</h3>
                            <div className="flex gap-3">
                                {productData.availableSizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-5 py-2 border rounded-md font-medium transition-all duration-200
                                            ${selectedSize === size
                                                ? 'bg-black text-white border-black'
                                                : 'bg-white text-gray-800 border-gray-300 hover:border-black'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Quantity:</h3>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-800 text-lg hover:bg-gray-100 transition-colors"
                            >
                                -
                            </button>
                            <span className="text-xl font-semibold text-gray-900">{quantity}</span>
                            <button
                                onClick={() => setQuantity(prev => prev + 1)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-800 text-lg hover:bg-gray-100 transition-colors"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-between gap-4">
                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-black text-white text-xl py-4 rounded-md font-semibold hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Product;