import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/Navbar";
import axios from "axios"; // Import Axios

const Cart = () => {
  const { t } = useTranslation();
  const [cart, setCart] = useState([]);
  const [notes, setNotes] = useState(""); // Notes for the order
  const [loading, setLoading] = useState(false); // Loading state for checkout
  const [error, setError] = useState(""); // Error handling
  const [success, setSuccess] = useState(""); 
  
  const [tableNo, setTableNo] = useState("");
  
  // Success message

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("myCart")) || [];
    setCart(storedCart);
  }, []);

  const handleRemoveProduct = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    localStorage.setItem("myCart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const handleQuantityChange = (index, type) => {
    const updatedCart = [...cart];
    if (type === "increase") {
      updatedCart[index].quantity += 1;
    } else if (type === "decrease" && updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    }
    localStorage.setItem("myCart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const tableNoChange =(event) =>{

setTableNo(event.target.value);


  }

  const handleCheckout = async () => {
    setLoading(true);
    setError("");
    setSuccess("");


    if (!tableNo.trim()) {
      setError(t("TableNumberRequired"));
      setLoading(false);
      return;
    }

    if (isNaN(tableNo)) {
      setError(t("InvalidTableNumber"));
      setLoading(false);
      return;
    }

    const orderData = {
      items: cart.map((item) => ({
        productId: item.id, // Ensure the ID matches what the backend expects
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: cart.reduce((total, product) => total + product.price * product.quantity, 0),
      notes: notes,
      tabelNo:tableNo,
    };

    try {
      const response = await axios.post("https://hayak-ver-beta.vercel.app/api/v1/createOrder", orderData); // Adjust the endpoint as per backend
      setSuccess(t("OrderSuccess"));
      localStorage.removeItem("myCart");
      setCart([]);
      setNotes("");
    } catch (error) {
      setError("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const betaTempOrder =()=>{

    alert(t("betaMsg"));



  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">🛒 {t("MyCart")}</h2>

        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}

        {cart.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 mt-6">{t("YourCartEmpty")}</p>
        ) : (
          <div className="mt-8 space-y-8">
            {cart.map((product, index) => (
              <div
                key={product.id}
                className="flex items-center justify-between rounded-lg bg-white shadow-md p-6 space-x-6 dark:bg-gray-800 dark:border-gray-700"
              >
                <img className="w-24 h-24 object-cover rounded-md" src={product.image} alt={product.name} />
                <div className="flex-1 rtl:pr-4">

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                  <div className="mt-2 flex items-center justify-between ">
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
                        className="w-12 text-center text-gray-900 dark:text-white font-semibold border-none outline-none bg-transparent appearance-none"
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
                <div className="text-lg font-semibold text-gray-900 dark:text-white mt-10">
                  ${product.price * product.quantity}
                </div>
              </div>
            ))}






            {/* Notes Section */}
         


            <div className="bg-white rounded-lg shadow-md p-6 space-y-4 dark:bg-gray-800 dark:border-gray-700">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{t("Notes")}</h3>
              <textarea
                value={notes}
                onChange={handleNotesChange}
                placeholder={t("NotesSub")}
                className="w-full p-4 text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows="4"
              />
            </div>

            <div class="mb-5">
      <label for="base-input " class="block mb-2 text-sm font-medium text-gray-900 dark:text-white rtl:mr-2">{t("TableNumber")}</label>
      <input type="text" id="base-input" value={tableNo} onChange={tableNoChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-15 p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 rtl:mr-2"/>
  </div>


            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-md p-6 space-y-4 dark:bg-gray-800 dark:border-gray-700">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{t("OrderSummary")}</h3>
              <div className="flex justify-between">
                <span>{t("Total")}</span>
                <span>
                  $
                  {cart.reduce((total, product) => total + product.price * product.quantity, 0)}
                </span>
              </div>
              <button
                onClick={betaTempOrder}
                className="w-full inline-block text-center bg-primary-700 py-2.5 px-5 rounded-lg text-black font-medium hover:bg-primary-800 transition duration-300"
                disabled={loading}
              >
                {loading ? t("Processing") : t("ProceedCheckout")}
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Cart;
