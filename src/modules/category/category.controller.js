import categoryModel from "../../../DB/models/category.model.js";
import slugify from "slugify";
export const addCategory = async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  const category = new categoryModel(req.body);
  await category.save();
  res.status(201).json({ message: "success", category });
};
