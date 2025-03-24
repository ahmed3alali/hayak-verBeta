import React from 'react'
import { useTranslation } from 'react-i18next';
import { addToCart } from "../utils/cartUtils";

const MenuCard = ({ item ,product}) => {

const {t} = useTranslation();


const handleAddToCart_s = () => {
  addToCart(product);
 
};
const handleAddToCart = () => {
  // Create a cart object with the necessary details
  const cart = {
    id: item._id, // Assuming `item._id` is the unique identifier for the product
    name: item.name,
    image: item.images[0]?.url,
    price: item.price,
    quantity: 1, // Default quantity when adding for the first time
  };

  // Get existing cart from localStorage
  const existingCart = JSON.parse(localStorage.getItem("myCart")) || [];

  // Check if the product already exists in the cart
  const existingProductIndex = existingCart.findIndex((product) => product.id === cart.id);

  if (existingProductIndex !== -1) {
    // Product exists, increase its quantity
    existingCart[existingProductIndex].quantity += 1;
  } else {
    // Product doesn't exist, add it to the cart
    existingCart.push(cart);
  }

  // Save the updated cart back to localStorage
  localStorage.setItem("myCart", JSON.stringify(existingCart));
  alert(t("addedCart"));

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
  