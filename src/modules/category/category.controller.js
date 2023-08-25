import categoryModel from "../../../DB/models/category.model.js";
import slugify from "slugify";
import { AppError, catchError } from "../../middleware/ErrorHandling.js";
import { deleteOne } from "../handlers/factory.js";
import ApiFeatures from "../../utils/ApiFeatures.js";
export const addCategory = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  const category = new categoryModel(req.body);
  await category.save();
  res.status(201).json({ message: "success", category });
});

export const getAllCategories = catchError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(categoryModel.find(), req.query)
    .paginate()
    .fields()
    .filter()
    .search()
    .sort();
  const categories = await apiFeatures.mongooseQuery;
  res.status(201).json({ message: "success", categories });
});

export const updateCategory = catchError(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  req.body.slug = slugify(req.body.name);
  const category = await categoryModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !category && next(new AppError("category doesn't exist", 404));
  category && res.status(200).json({ message: `success`, category });
});

export const deleteCategory = deleteOne(categoryModel);
