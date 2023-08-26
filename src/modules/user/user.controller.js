import userModel from "../../../DB/models/user.model.js";
import { AppError, catchError } from "../../middleware/ErrorHandling.js";
import { deleteOne } from "../handlers/factory.js";
import ApiFeatures from "../../utils/ApiFeatures.js";

export const adduser = catchError(async (req, res, next) => {
  const user = new userModel(req.body);
  await user.save();
  res.status(201).json({ message: "success", user });
});

export const getAllusers = catchError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(userModel.find(), req.query)
    .paginate()
    .fields()
    .filter()
    .search()
    .sort();
  const users = await apiFeatures.mongooseQuery;
  res.status(201).json({ message: "success", users });
});

export const updateuser = catchError(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = await userModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  !user && next(new AppError("user doesn't exist", 404));
  user && res.status(200).json({ message: `success`, user });
});

export const deleteuser = deleteOne(userModel);
