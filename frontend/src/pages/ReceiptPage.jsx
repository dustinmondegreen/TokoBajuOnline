// src/pages/ReceiptPage.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const ReceiptPage = () => {
  const [receipts, setReceipts] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      fetchReceipts(storedUser.customer_id);
    }
  }, []);

  const fetchReceipts = async (customerId) => {
    try {
      const ordersResponse = await axios.get('http://localhost:8000/api/orders');
      const userOrders = ordersResponse.data.filter(order => order.customer_id === customerId);
      setReceipts(userOrders);
    } catch (error) {
      console.error('Failed to fetch receipts:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8E8]">
      <div className="max-w-7xl mx-auto p-8">
        <h2 className="text-3xl font-bold mb-8 text-[#151523]">Your Receipts</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {receipts.map(receipt => (
            <div key={receipt.order_id} className="bg-[#151523] text-[#FFF8E8] p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">Order ID: {receipt.order_id}</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Shipping Address:</span>
                  <span>{receipt.shipping_address}</span>
                </div>
                <div className="flex justify-between">
                  <span>Order Date:</span>
                  <span>{receipt.order_date}</span>
                </div>
                <div className="flex justify-between">
                  <span>Order Status:</span>
                  <span>{receipt.order_status}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-gray-700 pt-4">
                  <span>Total Paid:</span>
                  <span>Rp. {parseFloat(receipt.total_amount).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {receipts.length === 0 && (
          <div className="text-center text-[#151523] mt-10">
            No receipts found.
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceiptPage;
