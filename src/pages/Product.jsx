import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';


const Product = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const productData = location.state?.productData;
    const [isAuthenticated, setIsAuthenticated] = useState(false);

     // Cek user saat halaman pertama dibuka
     useEffect(() => {
        const storedUser = localStorage.getItem('user');
        setIsAuthenticated(!!storedUser); // true kalau user ada di localStorage
    }, []);

    // Redirect ke catalog kalau user buka /product langsung
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
            product_id: productData.id // penting: productData.id adalah product_id backend
          });
      
          console.log('✅ Product added to cart:', response.data);
          alert('Product added to cart!');
          navigate('/cart'); // langsung ke halaman cart
      
        } catch (error) {
          console.error('❌ Failed to add to cart:', error);
          alert('Failed to add product to cart.');
        }
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

                        <div className="flex items-center gap-8">
                            <p className="text-lg font-medium">
                                Rating: <span className="text-yellow-500">{productData.rating} ★</span>
                            </p>
                            <p className="text-lg font-medium">
                                Qty: {productData.quantity}
                            </p>
                        </div>
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
