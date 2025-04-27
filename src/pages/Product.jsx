import { useLocation } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Product = () => {
    const location = useLocation();
    const productData = location.state?.productData || {
        name: "Blue Batman Shirt",
        description: "Comfortable cotton-based tshirt",
        price: "Rp 2.000.000.000",
        color: "Blue",
        material: "Cotton",
        category: "T-Shirt",
        rating: "4",
        quantity: "4000",
        image: "path-to-your-shirt-image.jpg"
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-[#FFF8E8] py-6 px-4">
            <div className="flex w-full max-w-7xl rounded-xl bg-[#fff7e6] gap-6">
                {/* Image Container */}
                <div className="flex-shrink-0 flex justify-center items-center border-2 border-[#151523] rounded-xl p-4" 
                    style={{width: '650px', height: '650px'}}>
                    <img 
                        src={productData.image} 
                        alt={productData.name} 
                        className="rounded-lg object-contain w-full h-full" 
                    />
                </div>

                {/* Description Container */}
                <div className="flex flex-col justify-between p-4 text-[#333] h-[650px]">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold">{productData.name}</h1>
                            <h2 className="text-xl text-gray-600">{productData.description}</h2>
                            <h1 className="text-4xl font-bold text-black">{productData.price}</h1>
                        </div>

                        <div className="flex gap-6 text-base">
                            <p>Color: <span className="font-medium">{productData.color}</span></p>
                            <p>Material: <span className="font-medium">{productData.material}</span></p>
                        </div>

                        <div className="flex items-center gap-4">
                            <p className="text-xl font-medium">Category</p>
                            <button className="bg-[#151523] text-[#FFF8E8] px-6 py-1.5 rounded-full text-base font-semibold hover:text-blue-600">{productData.category}</button>
                        </div>

                        <div className="space-y-2">
                            <p className="text-xl font-medium">Size</p>
                            <div className="flex flex-wrap gap-3">
                                <button className="bg-[#151523] text-[#FFF8E8] px-6 py-2 rounded-lg text-base hover:text-blue-600">S</button>
                                <button className="bg-[#151523] text-[#FFF8E8] px-6 py-2 rounded-lg text-base hover:text-blue-600">M</button>
                                <button className="bg-[#151523] text-[#FFF8E8] px-6 py-2 rounded-lg text-base hover:text-blue-600">L</button>
                                <button className="bg-[#151523] text-[#FFF8E8] px-6 py-2 rounded-lg text-base hover:text-blue-600">XL</button>
                                <button className="bg-[#151523] text-[#FFF8E8] px-6 py-2 rounded-lg text-base hover:text-blue-600">2XL</button>
                                <button className="bg-[#151523] text-[#FFF8E8] px-6 py-2 rounded-lg text-base hover:text-blue-600">3XL</button>
                            </div>
                        </div>

                        <div className="flex items-center gap-8">
                            <p className="text-lg font-medium">Rating: <span className="text-yellow-500">{productData.rating} ★</span></p>
                            <p className="text-lg font-medium">Qty: {productData.quantity}</p>
                        </div>
                    </div>

                    <button className="bg-[#151523] w-full text-center text-[#FFF8E8] text-xl py-3 rounded-lg font-semibold hover:text-blue-600">
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Product;
