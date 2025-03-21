// src/utils/cartUtils.js

export const getCartItems = () => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  };
  
  export const addToCart = (product) => {
    let cart = getCartItems();
  
    // Check if product already exists
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  
  export const removeFromCart = (id) => {
    let cart = getCartItems();
    cart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  
  export const updateQuantity = (id, newQuantity) => {
    let cart = getCartItems();
    cart = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  