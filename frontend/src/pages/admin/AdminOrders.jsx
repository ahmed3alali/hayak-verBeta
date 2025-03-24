import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { useTranslation } from "react-i18next";
import { Loader } from "lucide-react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showCompleted, setShowCompleted] = useState(false); // Toggle state

  const { t } = useTranslation();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://hayak-ver-beta.vercel.app/api/v1/orders");
        setOrders(response.data);
      } catch (error) {
        console.error(error);
        setMessage(t("fetchOrdersError"));
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [t]);

  const handleCompleteOrder = async (orderId) => {
    if (window.confirm(t("confirmCompleteOrder"))) {
      try {
        const response = await axios.patch(
          `https://hayak-ver-beta.vercel.app/api/v1/orders/${orderId}/complete`
        );
        setMessage(response.data.message);
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: "completed" } : order
          )
        );
      } catch (error) {
        setMessage(t("failedCompleteOrder"));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-gray-900">{t("adminOrders")}</h2>

        {message && <p className="text-green-500">{message}</p>}

        {/* Toggle Button */}
        <button
          onClick={() => setShowCompleted(!showCompleted)}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          {showCompleted ? t("showPendingOrders") : t("showCompletedOrders")}
        </button>

        {loading ? (
          <Loader />
        ) : (
          <div className="mt-8 space-y-8">
            {orders
              .filter((order) => (showCompleted ? order.status === "completed" : order.status !== "completed"))
              .map((order) => (
                <div
                  key={order._id}
                  className="flex flex-col p-6 rounded-lg bg-white shadow-md transition-all duration-500"
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    {`${t("order")} #${order._id.slice(-6)}`}
                  </h3>
                  <p className="text-gray-500">
                    {t("status")}: {t(order.status)}
                  </p>
                  <p className="text-gray-700">{t("Table")}: {order.tabelNo || t("notAvailable")}</p>
                  <p className="text-gray-700">{t("Notes")}: {order.notes || t("noNotes")}</p>

                  <div className="mt-4 space-y-4">
                    {order.items.map((item) => (
                      <div key={item.productId._id} className="flex justify-between items-center">
                        <span className="text-gray-700">{item.name} (x{item.quantity})</span>
                        <span className="text-gray-900">${item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  {/* Hide button if order is completed */}
                  {!showCompleted && order.status !== "completed" && (
                    <div className="mt-4">
                      <button
                        onClick={() => handleCompleteOrder(order._id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        {t("markAsCompleted")}
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminOrders;
