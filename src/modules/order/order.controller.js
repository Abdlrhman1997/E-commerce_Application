import cartModel from "../../../DB/models/cart.model.js";
import { AppError, catchError } from "../../middleware/ErrorHandling.js";
import orderModel from "../../../DB/models/order.model.js";
import productModel from "../../../DB/models/product.model.js";
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51Nn5ORAM3fepuCm77C1rIrosohOjiGYtyZOV1qkNpvNkhIfGZ8tdghI0fhN1XO4RYEYrUq9q5PKa70ZE2WDzFpbC00On7DEvwR"
);

export const createCashOrder = catchError(async (req, res, next) => {
  const cart = await cartModel.findById(req.params.id);
  const totalOrderPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;
  const order = new orderModel({
    user: req.user._id,
    cartItems: cart.cartItems,
    totalOrderPrice,
    shippingAddress: req.body.shippingAddress,
  });

  await order.save();

  let operations = [];
  if (order) {
    operations = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity, sold: item.quantity } },
      },
    }));

    await productModel.bulkWrite(operations);

    await cartModel.findByIdAndDelete(req.params.id);

    return res.status(201).json({ message: "success", order });
  } else {
    return next(new AppError("order doesn't exist", 404));
  }
});

export const getAllOrders = catchError(async (req, res, next) => {
  const order = await orderModel.find();
  if (order) {
    return res.status(201).json({ message: "success", order });
  }
  return next(new AppError("order doesn't exist", 404));
});

export const getUserOrder = catchError(async (req, res, next) => {
  const order = await orderModel.findOne({ user: req.user._id });
  if (order) {
    return res.status(201).json({ message: "success", order });
  }
  return next(new AppError("order doesn't exist", 404));
});

export const createCheckoutSession = catchError(async (req, res, next) => {
  const cart = await cartModel.findById(req.params.id);
  const totalOrderPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;

  let session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "egp",
          unit_amount: totalOrderPrice * 100,
          product_data: {
            name: req.user.name,
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://www.facebook.com/groups/694964727860442/",
    cancel_url: "https://www.youtube.com/",
    customer_email: req.user.email,
    client_reference_id: req.params.id,
    metadata: req.body.shippingAddress,
  });
  res.json({ message: "success", session });
});
