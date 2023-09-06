import cartModel from "../../../DB/models/cart.model.js";
import { AppError, catchError } from "../../middleware/ErrorHandling.js";
import orderModel from "../../../DB/models/order.model.js";
import { deleteOne } from "../handlers/factory.js";
import ApiFeatures from "../../utils/ApiFeatures.js";
import couponModel from "../../../DB/models/coupon.model.js";
import productModel from "../../../DB/models/product.model.js";

function calcTotalPrice(cart) {
  let totalPrice = 0;
  cart.cartItems.forEach((item) => {
    totalPrice += item.quantity * item.price;
  });
  cart.totalPrice = totalPrice;
}

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

  if (order) {
    const operations = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity, sold: item.quantity } },
      },
    }));
  }

  await productModel.bulkWrite(operations);

  await cartModel.findByIdAndDelete(req.params.id);
});
