import userModel from "../../../DB/models/user.model.js";
import { AppError, catchError } from "../../middleware/ErrorHandling.js";

export const addToWishlist = catchError(async (req, res, next) => {
  const { product } = req.body;
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { wishlist: product } },
    {
      new: true,
    }
  );
  !user &&
    next(new AppError("user doesn't exist or you are not authorized", 404));
  user && res.status(200).json({ message: `success`, user });
});

export const deleteFromWishlist = catchError(async (req, res, next) => {
  const { product } = req.body;
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    { $pull: { wishlist: product } },
    {
      new: true,
    }
  );
  !user &&
    next(new AppError("user doesn't exist or you are not authorized", 404));
  user && res.status(200).json({ message: `success`, user });
});

export const getUserWishlist = catchError(async (req, res, next) => {
  const user = await userModel.findById(req.user._id).populate("wishlist");
  !user &&
    next(new AppError("user doesn't exist or you are not authorized", 404));
  user && res.status(200).json({ message: `success`, wishlist: user.wishlist });
});
