import couponModel from "../../../DB/models/coupon.model.js";
import { AppError, catchError } from "../../middleware/ErrorHandling.js";
import { deleteOne } from "../handlers/factory.js";
import ApiFeatures from "../../utils/ApiFeatures.js";
import qrcode from "qrcode";

export const addcoupon = catchError(async (req, res, next) => {
  const coupon = new couponModel(req.body);
  await coupon.save();
  res.json({ message: "done", coupon });
});

export const getAllcoupons = catchError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(couponModel.find(), req.query)
    .paginate()
    .fields()
    .filter()
    .search()
    .sort();
  const coupons = await apiFeatures.mongooseQuery;

  res.status(201).json({ message: "success", coupons });
});

export const getCoupon = catchError(async (req, res, next) => {
  const { id } = req.params;
  const coupon = await couponModel.findById(id);
  const url = await qrcode.toDataURL(coupon.code);
  res.status(201).json({ message: "success", coupon, url });
});

export const updatecoupon = catchError(async (req, res, next) => {
  const { id } = req.params;
  const coupon = await couponModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !coupon &&
    next(new AppError("coupon doesn't exist or you are not authorized", 404));
  coupon && res.status(200).json({ message: `success`, coupon });
});

export const deletecoupon = deleteOne(couponModel);
