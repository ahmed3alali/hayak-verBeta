import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // For showing success/error message

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://hayak-ver-beta.vercel.app/api/v1/orders"); // Endpoint to get all orders
        setOrders(response.data);
      } catch (error) {
        console.error(error);
        setMessage("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleCompleteOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to mark this order as completed?")) {
      try {
        const response = await axios.patch(`https://hayak-ver-beta.vercel.app/api/v1/orders/${orderId}/complete`);
        setMessage(response.data.message);
        // Optionally refresh the orders list
        setOrders(orders.map(order => order._id === orderId ? { ...order, status: "completed" } : order));
      } catch (error) {
        setMessage("Failed to mark order as completed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-gray-900">Admin Orders</h2>
        
        {message && <p className="text-green-500">{message}</p>}

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="mt-8 space-y-8">
            {orders.map((order) => (
              <div key={order._id} className="flex flex-col p-6 rounded-lg bg-white shadow-md">
                <h3 className="text-lg font-semibold text-gray-900">{`Order #${order._id}`}</h3>
                <p className="text-gray-500">Status: {order.status}</p>

                <div className="mt-4 space-y-4">
                  {order.items.map((item) => (
                    <div key={item.productId._id} className="flex justify-between items-center">
                      <span className="text-gray-700">{item.name} (x{item.quantity})</span>
                      <span className="text-gray-900">${item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => handleCompleteOrder(order._id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    disabled={order.status === "completed"}
                  >
                    Mark as Completed
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminOrders;
