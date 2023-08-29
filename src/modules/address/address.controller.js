import userModel from "../../../DB/models/user.model.js";
import { AppError, catchError } from "../../middleware/ErrorHandling.js";

export const addToAddress = catchError(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { addresses: req.body } },
    {
      new: true,
    }
  );
  !user &&
    next(new AppError("user doesn't exist or you are not authorized", 404));
  user && res.status(200).json({ message: `success`, user });
});

export const deleteFromAddress = catchError(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    { $pull: { addresses: { _id: req.body.addressId } } },
    {
      new: true,
    }
  );
  !user &&
    next(new AppError("user doesn't exist or you are not authorized", 404));
  user && res.status(200).json({ message: `success`, user });
});

export const getUserAddress = catchError(async (req, res, next) => {
  const user = await userModel.findById(req.user._id);
  !user &&
    next(new AppError("user doesn't exist or you are not authorized", 404));
  user &&
    res.status(200).json({ message: `success`, wishlist: user.addresses });
});
