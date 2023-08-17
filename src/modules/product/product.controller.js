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
  //Paginagtion
  const pageLimit = 5;
  let pageNumber = req.query.page * 1 || 1;
  if (pageNumber <= 0) {
    pageNumber = 1;
  }
  const skip = (pageLimit - 1) * pageNumber;

  //==========================//
  //Filteration
  let filterObject = req.query;
  let excludeedQuery = ["page", "sort", "fields", "keyword"];
  excludeedQuery.forEach((e) => {
    delete filterObject["e"];
  });
  console.log(filterObject);
  const categories = await productModel
    .find(filterObject)
    .skip(skip)
    .limit(pageLimit);
  res.status(201).json({ page: pageNumber, message: "success", categories });
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
