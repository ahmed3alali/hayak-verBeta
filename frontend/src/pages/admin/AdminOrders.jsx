import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/Navbar";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
const {t} = useTranslation();
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  const handleRemoveOrder = (index) => {
    const updatedOrders = [...orders];
    updatedOrders.splice(index, 1);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
  };

  return (
    
    <div className="min-h-screen max-w-full bg-gray-50 overflow-x-hidden mb-20">
      <Navbar/>
    
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">📦 {t("Orders")}</h1>
        {orders.length === 0 ? (
          <p className="text-gray-500 text-center">{t("NoOrders")}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {orders.map((order, index) => (
              <div key={index} className="bg-white p-4 shadow-md rounded-lg flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={order.image}
                    alt={order.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="text-lg font-semibold mr-8 ">{order.name}</h2>
                    <p className="text-gray-500 mr-8">{t("Table")} {order.tableNumber}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveOrder(index)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300"
                >
                  ✅ {t("Confirm")}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
