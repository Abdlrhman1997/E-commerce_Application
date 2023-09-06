import { Schema, Types, model } from "mongoose";

const orderSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "user" },
    cartItems: [
      {
        product: { type: Types.ObjectId, ref: "user" },
        price: Number,
        quantity: Number,
      },
    ],
    totalOrderPrice: Number,
    shippingAddress: {
      street: String,
      city: String,
      phone: String,
    },
    paymentMethod: {
      type: String,
      enum: ["card", "cash"],
      default: "cash",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: Date,
    deliveredAt: Date,
    isDelivered: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const orderModel = model("order", orderSchema);

export default orderModel;
