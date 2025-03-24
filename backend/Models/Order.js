import mongoose from "mongoose";

// Order schema
const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: Number,
    unique: true, // Ensures each order number is unique
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Linking to Product model
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
    default: "",
  },
  tabelNo: {
    type: Number,
    default: "",
  },
  status: {
    type: String,
    default: "pending", // Status can be pending, completed, etc.
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Auto-increment `orderNumber` before saving
orderSchema.pre("save", async function (next) {
  if (!this.orderNumber) {
    const lastOrder = await this.constructor.findOne().sort("-orderNumber");
    this.orderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1;
  }
  next();
});

export default mongoose.model("Order", orderSchema);
