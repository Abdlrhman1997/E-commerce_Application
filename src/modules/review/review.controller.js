import reviewModel from "../../../DB/models/review.model.js";
import { AppError, catchError } from "../../middleware/ErrorHandling.js";
import { deleteOne } from "../handlers/factory.js";
import ApiFeatures from "../../utils/ApiFeatures.js";

export const addreview = catchError(async (req, res, next) => {
  req.body.user = req.user._id;
  const reviewd = await reviewModel.findOne({
    user: req.user._id,
    product: req.body.product,
  });
  if (reviewd) {
    return next(new AppError("you already reviewed this item", 409));
  }
  const review = new reviewModel(req.body);
  await review.save();
  res.status(201).json({ message: "success", review });
});

export const getAllreviews = catchError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(reviewModel.find(), req.query)
    .paginate()
    .fields()
    .filter()
    .search()
    .sort();
  const reviews = await apiFeatures.mongooseQuery;
  res.status(201).json({ message: "success", reviews });
});

export const updatereview = catchError(async (req, res, next) => {
  const { id } = req.params;
  const review = await reviewModel.findOneAndUpdate(
    { _id: id, user: req.user._id },
    req.body,
    {
      new: true,
    }
  );
  !review &&
    next(new AppError("review doesn't exist or you are not authorized", 404));
  review && res.status(200).json({ message: `success`, review });
});

export const deletereview = deleteOne(reviewModel);
