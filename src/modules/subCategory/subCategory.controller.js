import subCategoryModel from "../../../DB/models/subCategory.model.js";
import slugify from "slugify";
import { AppError, catchError } from "../../middleware/ErrorHandling.js";
import { deleteOne } from "../handlers/factory.js";

export const addSubCategory = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  const subCategory = new subCategoryModel(req.body);
  await subCategory.save();
  res.status(201).json({ message: "success", subCategory });
});

export const getAllSubCategories = catchError(async (req, res, next) => {
  let filter = {};
  if (req.params.categoryId) {
    filter = { category: req.params.categoryId };
  }

  const subCategories = await subCategoryModel.find(filter);

  res.status(201).json({ message: "success", subCategories });
});

export const updateSubCategory = catchError(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.slug) req.body.slug = slugify(req.body.name);
  const subCategory = await subCategoryModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !subCategory && next(new AppError("subCategory doesn't exist", 404));
  subCategory && res.status(200).json({ message: `success`, subCategory });
});

export const deleteSubCategory = deleteOne(subCategoryModel);
