import cartModel from "../../../DB/models/cart.model.js";
import { AppError, catchError } from "../../middleware/ErrorHandling.js";
import orderModel from "../../../DB/models/order.model.js";
import productModel from "../../../DB/models/product.model.js";

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
