const mongoose = require("mongoose");

// schema for storing the order details
const orderSchema = new mongoose.Schema(
  {
    sub_total: {
      type: String,
      trim: true,
    },
    phone_number: {
      type: String,
      trim: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    product: {
      product_name: {
        type: String,
        trim: true,
      },
      price: {
        type: String,
        trim: true,
      },
      desc: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
