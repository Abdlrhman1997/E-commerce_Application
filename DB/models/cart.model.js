import { Schema, Types, model } from "mongoose";

const cartSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "user" },
    cartItems: [
      {
        product: { type: Types.ObjectId, ref: "user" },
        price: Number,
        quantity: {
          type: Number,
          default: 1,
        },
        totalPriceDiscount: Number,
      },
    ],
    totalPrice: Number,
    discount: Number,
    totalPriceAfterDiscount: Number,
  },
  { timestamps: true }
);

const cartModel = model("cart", cartSchema);

export default cartModel;
