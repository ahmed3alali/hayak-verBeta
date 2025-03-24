import Order from "../../backend/Models/Order.js"; // Import Order model
import Product from "../Models/productModel.js"; // Import Product model

// Controller for creating an order
export const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, notes, tabelNo } = req.body;

    // Validate the items
    const products = await Product.find({ _id: { $in: items.map((item) => item.productId) } });
    if (products.length !== items.length) {
      return res.status(400).json({ message: "Some products were not found" });
    }

    // Create a new order
    const newOrder = new Order({
      items: items.map((item) => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount,
      notes,
      tabelNo,
    });

    // Save the order to the database
    await newOrder.save();

    return res.status(201).json({
      message: `Order #${newOrder.orderNumber} placed successfully!`,
      order: newOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to place order. Please try again." });
  }
};

// Controller to get all orders
export const getOrders = async (req, res) => {
  try {
    // Fetch all orders from the database, sorted by orderNumber
    const orders = await Order.find().sort("orderNumber").populate("items.productId");

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found." });
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve orders. Please try again." });
  }
};

// Controller to update order status to "completed"
export const completeOrder = async (req, res) => {
  try {
    const { orderId } = req.params; // Get order ID from the URL parameter

    // Find the order by ID
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Set the status to "completed"
    order.status = "completed";
    await order.save();

    return res.status(200).json({
      message: `Order #${order.orderNumber} marked as completed!`,
      order: order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to complete order. Please try again." });
  }
};
