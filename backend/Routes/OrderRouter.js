import express from "express";
import  {completeOrder, createOrder, getOrders}  from "../../backend/Controllers/OrderController.js";

const router = express.Router();

// POST request for creating an order
router.post("/createOrder", createOrder);
router.get("/orders", getOrders);
router.patch("/orders/:orderId/complete", completeOrder);
export default router;