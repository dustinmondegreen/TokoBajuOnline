import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Product = () => {
    return (
<div className="w-full min-h-screen flex items-center justify-center bg-[#fff7e6] py-6 px-4">
  <div className="flex w-full max-w-7xl rounded-xl bg-[#fff7e6] gap-6">
    
    {/* Image Container - Fixed 650x650 */}
    <div className="flex-shrink-0 flex justify-center items-center border-2 border-blue-400 rounded-xl p-4" 
         style={{width: '650px', height: '650px'}}>
      <img src="path-to-your-shirt-image.jpg" alt="Blue Batman Shirt" 
           className="rounded-lg object-contain w-full h-full" />
    </div>

    {/* Description Container - Now with justify-between */}
    <div className="flex flex-col justify-between p-4 text-[#333] h-[650px]">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Blue Batman Shirt</h1>
          <h2 className="text-xl text-gray-600">Comfortable cotton-based tshirt</h2>
          <h1 className="text-4xl font-bold text-black">Rp 2.000.000.000</h1>
        </div>

        <div className="flex gap-6 text-base">
          <p>Color: <span className="font-medium">Blue</span></p>
          <p>Material: <span className="font-medium">Cotton</span></p>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-xl font-medium">Category</p>
          <button className="bg-gray-200 px-6 py-1.5 rounded-full text-base font-semibold">T-Shirt</button>
        </div>

        <div className="space-y-2">
          <p className="text-xl font-medium">Size</p>
          <div className="flex flex-wrap gap-3">
            <button className="bg-gray-200 px-6 py-2 rounded-lg text-base">S</button>
            <button className="bg-gray-200 px-6 py-2 rounded-lg text-base">M</button>
            <button className="bg-gray-200 px-6 py-2 rounded-lg text-base">L</button>
            <button className="bg-gray-200 px-6 py-2 rounded-lg text-base">XL</button>
            <button className="bg-gray-200 px-6 py-2 rounded-lg text-base">2XL</button>
            <button className="bg-gray-200 px-6 py-2 rounded-lg text-base">3XL</button>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <p className="text-lg font-medium">Rating: <span className="text-yellow-500">4 ★</span></p>
          <p className="text-lg font-medium">Qty: 4000</p>
        </div>
      </div>

      <button className="bg-gray-300 w-full text-center text-xl py-3 rounded-lg font-semibold hover:bg-gray-400">
        Add To Cart
      </button>
    </div>
  </div>
</div>
    );
};
  
export default Product;
  