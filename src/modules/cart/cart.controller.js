import cartModel from "../../../DB/models/cart.model.js";
import { AppError, catchError } from "../../middleware/ErrorHandling.js";
import { deleteOne } from "../handlers/factory.js";
import ApiFeatures from "../../utils/ApiFeatures.js";
import userModel from "../../../DB/models/user.model.js";
import productModel from "../../../DB/models/product.model.js";

function calcTotalPrice(cart) {
  let totalPrice = 0;
  cart.cartItems.forEach((item) => {
    totalPrice += item.quantity * item.price;
  });
  cart.totalPrice = totalPrice;
}

export const addProductToCart = catchError(async (req, res, next) => {
  const product = await productModel.findById(req.body.product).select("price");
  if (!product) {
    return next(new AppError("product doesn't exist", 401));
  }
  req.body.price = product.price;
  let isCart = await cartModel.findOne({ user: req.user._id });
  if (!isCart) {
    const cart = new cartModel({
      user: req.user._id,
      cartItems: [req.body],
    });
    calcTotalPrice(cart);
    await cart.save();
    return res.status(201).json({ message: "success", cart });
  }

  let item = isCart.cartItems.find((elm) => elm.product == req.body.product);
  if (item) {
    item.quantity += req.body.quantity || 1;
  } else {
    isCart.cartItems.push(req.body);
  }
  calcTotalPrice(isCart);
  await isCart.save();
  res.status(201).json({ message: "add to cart", cart: isCart });
});
