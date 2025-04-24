const Cart = () => {
  return (
    <div className="flex justify-center p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">
        {/* Shopping Bag Section */}
        <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold mb-6">MY SHOPPING BAG</h1>
          
          {/* Headers */}
          <div className="flex justify-between border-b pb-2 mb-4">
            <h2 className="font-semibold text-lg w-2/3">PRODUCT</h2>
            <h2 className="font-semibold text-lg text-right w-1/3">PRICE</h2>
          </div>

          {/* Item List */}
          <div className="border-b pb-6 mb-6">
            <div className="flex gap-4">
              {/* Product Image */}
              <div className="w-24 h-24 bg-gray-200 rounded"></div>

              {/* Product Details */}
              <div className="flex-1">
                <h3 className="font-bold">BATMAN T-SHIRT SUPERHERO</h3>
                <div className="text-sm text-gray-600 mt-1">
                  <p>Item No: 894985949485</p>
                  <p>Size: XL</p>
                  <p>Color: Sky Blue</p>
                  <p>Qty: 1</p>
                </div>

                <div className="flex gap-4 mt-3">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">EDIT</button>
                  <button className="text-red-600 hover:text-red-800 text-sm font-medium">REMOVE</button>
                </div>
              </div>

              {/* Price */}
              <div className="w-1/3 text-right">
                <p className="font-semibold">Rp. 1,500,000.00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-sm h-fit sticky top-6">
          <h1 className="text-2xl font-bold mb-4">SUMMARY</h1>
          <hr className="my-2" />

          <div className="space-y-3 mb-4">
            <div className="flex justify-between">
              <p className="text-gray-600">Subtotal</p>
              <p className="font-semibold">Rp. 1,500,000.00</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Shipping</p>
              <p className="font-semibold">Rp. 0.00</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Sales Tax</p>
              <p className="font-semibold">Rp. 0.00</p>
            </div>
          </div>

          <hr className="my-2" />

          <div className="flex justify-between my-4">
            <p className="font-bold">Estimated Total</p>
            <p className="font-bold text-lg">Rp. 1,500,000.00</p>
          </div>

          <hr className="my-2" />

          <button className="w-full bg-black text-white py-3 rounded font-bold hover:bg-gray-800 transition mt-4">
            CHECKOUT
          </button>

          <hr className="my-4" />

          <p className="text-center text-gray-500 text-sm">Need Help? Call us at 888</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;