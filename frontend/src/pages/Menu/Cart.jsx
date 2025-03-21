import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/Navbar";
import { getCartItems, removeFromCart, updateQuantity } from "../../utils/cartUtils";

const Cart = () => {
  const { t } = useTranslation();
  const [cart, setCarts] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("myCart")) || [];
    setCarts(storedCart);
  }, []);

  const handleRemoveProduct = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    localStorage.setItem("myCart", JSON.stringify(updatedCart));
    setCarts(updatedCart);
  };

  const handleQuantityChange = (index, type) => {
    const updatedCart = [...cart];
    if (type === "increase") {
      updatedCart[index].quantity += 1;
    } else if (type === "decrease" && updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    }
    localStorage.setItem("myCart", JSON.stringify(updatedCart));
    setCarts(updatedCart);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">{t("MyCart")}</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 mt-6">{t("Your cart is empty.")}</p>
        ) : (
          <div className="mt-8 space-y-8">
            <div className="space-y-4">
              {cart.map((product, index) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between rounded-lg bg-white shadow-md p-6 space-x-6 dark:bg-gray-800 dark:border-gray-700"
                >
                  <img
                    className="w-24 h-24 object-cover rounded-md"
                    src={product.image}
                    alt={product.name}
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{product.description}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleQuantityChange(index, "decrease")}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-lg text-gray-700"
                        >
                          -
                        </button>
                        <input
                          type="text"
                          value={product.quantity}
                          readOnly
                          className="w-12 text-center text-gray-900 dark:text-white font-semibold"
                        />
                        <button
                          onClick={() => handleQuantityChange(index, "increase")}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-lg text-gray-700"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveProduct(index)}
                        className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500"
                      >
                        {t("Remove")}
                      </button>
                    </div>
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    ${product.price * product.quantity}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 space-y-4 dark:bg-gray-800 dark:border-gray-700">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{t("OrderSummary")}</h3>
              <div className="flex justify-between">
                <span>{t("Total")}</span>
                <span>
                  $
                  {cart.reduce((total, product) => total + product.price * product.quantity, 0)}
                </span>
              </div>
              <a
                href="#"
                className="w-full inline-block text-center bg-primary-700 py-2.5 px-5 rounded-lg text-white font-medium hover:bg-primary-800 transition duration-300"
              >
                {t("Proceed to Checkout")}
              </a>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Cart;
