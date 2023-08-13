import productModel from "../../../DB/models/product.model.js";
import slugify from "slugify";
import { AppError, catchError } from "../../middleware/ErrorHandling.js";
import { deleteOne } from "../handlers/factory.js";

export const addproduct = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  const product = new productModel(req.body);
  await product.save();
  res.status(201).json({ message: "success", product });
});

export const getAllCategories = catchError(async (req, res, next) => {
  const categories = await productModel.find();
  res.status(201).json({ message: "success", categories });
});

export const updateproduct = catchError(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }

  const product = await productModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !product && next(new AppError("product doesn't exist", 404));
  product && res.status(200).json({ message: `success`, product });
});

export const deleteproduct = deleteOne(productModel);
