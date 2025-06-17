import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Product = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const productData = location.state?.productData;
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [ratingValue, setRatingValue] = useState(0);
    const [averageRating, setAverageRating] = useState(null);
    const [hasRated, setHasRated] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        setIsAuthenticated(!!storedUser);
        fetchAverageRating();
    }, []);

    const fetchAverageRating = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/reviews/by-product/${productData.id}`);
            const reviews = res.data;
            if (reviews.length > 0) {
                const avg = reviews.reduce((sum, r) => sum + Number(r.rating), 0) / reviews.length;
                setAverageRating(avg.toFixed(1));
            } else {
                setAverageRating(null);
            }
        } catch (err) {
            console.error("Failed to fetch reviews:", err);
        }
    };

    const handleRatingSubmit = async () => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
            alert("Login required to rate product.");
            navigate("/login");
            return;
        }

        try {
            await axios.post("http://localhost:8000/api/reviews", {
                product_id: productData.id,
                customer_id: storedUser.customer_id,
                rating: ratingValue
            });
            setHasRated(true);
            fetchAverageRating();
            alert("Thank you for your rating!");
        } catch (err) {
            if (err.response?.data?.message) {
            alert(err.response.data.message);
            } else if (err.response?.data?.error) {
            alert(JSON.stringify(err.response.data.error));
            } else {
            alert("Gagal mengirim review. Silakan coba lagi.");
            }
          }
    };

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

        try {
            const response = await axios.post('http://localhost:8000/api/cart', {
                customer_id: storedUser.customer_id,
                product_id: productData.id
            });

            console.log('✅ Product added to cart:', response.data);
            alert('Product added to cart!');
            navigate('/cart');

        } catch (error) {
            console.error('❌ Failed to add to cart:', error);
            alert('Failed to add product to cart.');
        }

        const fetchAverageRating = async () => {
    try {
        const res = await axios.get(`http://localhost:8000/api/reviews/by-product/${productData.id}`);
        console.log("Fetched review list:", res.data); // ✅ DEBUG LINE

        const reviews = res.data;

        if (Array.isArray(reviews) && reviews.length > 0) {
            const avg = reviews.reduce((sum, r) => sum + Number(r.rating), 0) / reviews.length;
            console.log("Avg rating calculated:", avg); // ✅ DEBUG LINE
            setAverageRating(avg.toFixed(1));
        } else {
            console.log("Reviews array is empty or invalid."); // ✅ DEBUG LINE
            setAverageRating(null);
        }
    } catch (err) {
        console.error("Failed to fetch reviews:", err);
    }
};
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-[#FFF8E8] py-6 px-4">
            <div className="flex w-full max-w-7xl rounded-xl bg-[#fff7e6] gap-6">
                {/* Image Section */}
                <div
                    className="flex-shrink-0 flex justify-center items-center border-2 border-[#151523] rounded-xl p-4"
                    style={{ width: '650px', height: '650px' }}
                >
                    <img
                        src={productData.image}
                        alt={productData.name}
                        className="rounded-lg object-contain w-full h-full"
                    />
                </div>

                {/* Detail Section */}
                <div className="flex flex-col justify-between p-4 text-[#333] h-[650px]">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold">{productData.name}</h1>
                            <h1 className="text-4xl font-bold text-black">Rp {productData.price}</h1>
                            <h2 className="text-2xl font-bold text-black">{productData.id}</h2>
                        </div>

                        <div className="flex gap-6 text-base">
                            <p>Color: <span className="font-medium">{productData.color}</span></p>
                            <p>Material: <span className="font-medium">{productData.material}</span></p>
                        </div>

                        <div className="flex items-center gap-4">
                            <p className="text-xl font-medium">Category</p>
                            <button className="bg-[#151523] text-[#FFF8E8] px-6 py-1.5 rounded-full text-base font-semibold hover:text-blue-600">
                                {productData.category}
                            </button>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="text-lg font-medium">
                                Average Rating: <span className="text-yellow-500">{averageRating ?? "No ratings yet"} ★</span>
                            </p>
                            {!hasRated && isAuthenticated && (
                                <div className="flex items-center gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => setRatingValue(star)}
                                            className={`text-2xl ${ratingValue >= star ? "text-yellow-500" : "text-gray-300"}`}
                                        >
                                            ★
                                        </button>
                                    ))}
                                    <button
                                        onClick={handleRatingSubmit}
                                        disabled={!ratingValue}
                                        className="ml-2 px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
                                    >
                                        Submit
                                    </button>
                                </div>
                            )}
                        </div>

                        <p className="text-lg font-medium">
                            Qty: {productData.quantity}
                        </p>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="bg-[#151523] w-full text-center text-[#FFF8E8] text-xl py-3 rounded-lg font-semibold hover:text-blue-600"
                    >
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Product;

