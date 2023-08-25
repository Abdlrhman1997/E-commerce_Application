import productModel from "../../../DB/models/product.model.js";
import slugify from "slugify";
import { AppError, catchError } from "../../middleware/ErrorHandling.js";
import { deleteOne } from "../handlers/factory.js";
import ApiFeatures from "../../utils/ApiFeatures.js";

export const addproduct = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  const product = new productModel(req.body);
  await product.save();
  res.status(201).json({ message: "success", product });
});

export const getAllProducts = catchError(async (req, res, next) => {
  const apiFeatures = new ApiFeatures(productModel.find(), req.query)
    .paginate()
    .fields()
    .filter()
    .search()
    .sort();

  const result = await apiFeatures.mongooseQuery;

  res.status(201).json({ page: apiFeatures.page, message: "success", result });
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
