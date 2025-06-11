import Order from "../../backend/Models/Order.js"; // Import Order model
import Product from "../Models/productModel.js"; // Import Product model



// Controller for creating an order
export const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, notes, token } = req.body;  // changed tabelNo to token

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret from env
    } catch (err) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }

    // Check if token was already used
    const used = await UsedToken.findOne({ token });
    if (used) {
      return res.status(403).json({ message: "Token already used for an order." });
    }

    // Validate products
    const products = await Product.find({ _id: { $in: items.map((item) => item.productId) } });
    if (products.length !== items.length) {
      return res.status(400).json({ message: "Some products were not found" });
    }

    // Extract table number from token payload
    const tabelNo = decoded.table;

    // Create order
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

    await newOrder.save();

    // Mark token as used
    const newUsedToken = new UsedToken({ token });
    await newUsedToken.save();

    return res.status(201).json({
      message: `Order #${newOrder.orderNumber} placed successfully at table ${tabelNo}!`,
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
