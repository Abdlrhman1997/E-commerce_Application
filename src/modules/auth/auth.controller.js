import userModel from "../../../DB/models/user.model.js";
import { AppError, catchError } from "../../middleware/ErrorHandling.js";
import jwt from "jsonwebtoken";
export const signUp = catchError(async (req, res, next) => {
  const isUser = await userModel.findOne({ email: req.body.email });
  if (isUser) {
    return next(new AppError("account already exist", 409));
  }
  const user = new userModel(req.body);
  await user.save();
  res.status(201).json({ message: "success", user });
});
