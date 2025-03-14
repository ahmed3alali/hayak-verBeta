import React from 'react'
import { useTranslation } from 'react-i18next';


const MenuCard = ({ item }) => {

const {t} = useTranslation();

  const handleAddToCart = () => {
    const tableNumber = prompt(t("TableNo"));

    // Validate input (ensure it's a number and not empty)
    if (!tableNumber || isNaN(tableNumber) || tableNumber <= 0) {
      alert("Please enter a valid table number!");
      return;
    }

    const order = {
      name: item.name,
      image: item.images[0]?.url, // Ensure this is a URL
      tableNumber: tableNumber, // User-provided table number
    };

    // Get existing orders from localStorage or create an empty array
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

    // Add new order
    existingOrders.push(order);

    // Save back to localStorage
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    alert(`Order for Table ${tableNumber} added successfully!`);
  };

    return (
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden animate-fade-in">
        <div className="relative aspect-[4/3] overflow-hidden">
        <img
  src={item.images[0]?.url}
  alt={item.name}
  className="w-full h-full object-fill transform hover:scale-105 transition-transform duration-300"
/>

          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="font-semibold text-gray-900">${item.price}</span>
          </div>
          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="font-semibold text-gray-900" onClick={handleAddToCart}>🛒</span>
          </div>
        </div>
        <div className="p-4">
          <div className="inline-block px-2 py-1 mb-2 text-xs font-medium bg-soft-gray text-gray-600 rounded-full">
          {t(item.category.replace(/\s+/g, ''))}
          </div>

         
          <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
          
          <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
        </div>
      </div>
    );
  };
  
  export default MenuCard;
  