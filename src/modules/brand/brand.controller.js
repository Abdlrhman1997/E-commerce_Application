import brandModel from "../../../DB/models/brand.model.js";
import slugify from "slugify";
import { AppError, catchError } from "../../middleware/ErrorHandling.js";
import { deleteOne } from "../handlers/factory.js";
import ApiFeatures from "../../utils/ApiFeatures.js";

export const addbrand = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  const brand = new brandModel(req.body);
  await brand.save();
  res.status(201).json({ message: "success", brand });
});

export const getAllBrands = catchError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(brandModel.find(), req.query)
    .paginate()
    .fields()
    .filter()
    .search()
    .sort();
  const brands = await apiFeatures.mongooseQuery;
  res.status(201).json({ message: "success", brands });
});

export const updatebrand = catchError(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  req.body.slug = slugify(req.body.name);
  const brand = await brandModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !brand && next(new AppError("brand doesn't exist", 404));
  brand && res.status(200).json({ message: `success`, brand });
});

export const deletebrand = deleteOne(brandModel);
