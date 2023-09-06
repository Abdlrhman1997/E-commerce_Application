import cartModel from "../../../DB/models/cart.model.js";
import { AppError, catchError } from "../../middleware/ErrorHandling.js";
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
  if (isCart.discount) {
    isCart.totalPriceAfterDiscount =
      isCart.totalPrice - (isCart.totalPrice * isCart.discount) / 100;
  }

  await isCart.save();
  res.status(201).json({ message: "add to cart", cart: isCart });
});

export const removeProductFromCart = catchError(async (req, res, next) => {
  const cart = await cartModel.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { cartItems: { product: req.params.id } } },
    {
      new: true,
    }
  );
  calcTotalPrice(cart);
  if (cart.discount) {
    cart.totalPriceAfterDiscount =
      cart.totalPrice - (cart.totalPrice * cart.discount) / 100;
  }

  if (!cart.cartItems.length) {
    cart.discount = 1;
  }
  !cart &&
    next(new AppError("cart doesn't exist or you are not authorized", 404));
  await cart.save();
  cart && res.status(200).json({ message: `success`, cart });
});

export const applyCoupon = catchError(async (req, res, next) => {
  const coupon = await couponModel.findOne({
    code: req.body.code,
    expires: { $gt: Date.now() },
  });
  if (!coupon) {
    return next(new AppError("coupon expired or doesn't exist"));
  }
  console.log(coupon);
  let cart = await cartModel.findOne({ user: req.user._id });
  if (!cart) {
    return next(new AppError("this user doesn't have a cart"));
  }
  console.log(cart.totalPrice);

  cart.totalPriceAfterDiscount =
    cart.totalPrice - (cart.totalPrice * coupon.discount) / 100;
  cart.discount = coupon.discount;
  await cart.save();
  res.status(201).json({ message: "success", cart });
});

export const updateCartProductQuantity = catchError(async (req, res, next) => {
  const product = await productModel.findById(req.params.id).select("price");
  if (!product) {
    return next(new AppError("product doesn't exist", 404));
  }

  let isCart = await cartModel.findOne({ user: req.user._id });

  let item = isCart.cartItems.find((elm) => elm.product == req.params.id);
  if (item) {
    item.quantity = req.body.quantity;
  }
  calcTotalPrice(isCart);
  if (isCart.discount) {
    isCart.totalPriceAfterDiscount =
      isCart.totalPrice - (isCart.totalPrice * isCart.discount) / 100;
  }

  await isCart.save();
  res.status(201).json({ message: "add to cart", cart: isCart });
});

export const getLogedUserCart = catchError(async (req, res, next) => {
  const cart = await cartModel.findOne({ user: req.user._id });
  if (cart) {
    res.status(201).json({ message: "success", cart });
  } else {
    return next(new AppError("this user doesn't have cart"));
  }
});
