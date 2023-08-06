import categoryModel from "../../../DB/models/category.model.js";
import slugify from "slugify";
export const addCategory = async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  const category = new categoryModel(req.body);
  await category.save();
  res.status(201).json({ message: "success", category });
};

export const getAllCategories = async (req, res, next) => {
  const categories = await categoryModel.find();
  res.status(201).json({ message: "success", categories });
};

export const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  req.body.slug = slugify(req.body.name);
  const category = await categoryModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(201).json({ message: "success", category });
};

export const deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  const category = await categoryModel.findByIdAndDelete(id);

  !category && res.status(404).json({ message: `category not found` });
  category && res.status(200).json({ message: `success`, category });
};
