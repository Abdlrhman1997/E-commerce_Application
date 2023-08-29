import userModel from "../../../DB/models/user.model.js";
import { AppError, catchError } from "../../middleware/ErrorHandling.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const signUp = catchError(async (req, res, next) => {
  const isUser = await userModel.findOne({ email: req.body.email });
  if (isUser) {
    return next(new AppError("account already exist", 409));
  }
  const user = new userModel(req.body);
  await user.save();
  const token = jwt.sign(
    { email: user.email, name: user.email, id: user._id, role: user.role },
    "sasadanceonmsasa"
  );
  res.status(201).json({ message: "success", token });
});

export const signIn = catchError(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      { email: user.email, name: user.email, id: user._id, role: user.role },
      "sasadanceonmsasa"
    );
    res.status(201).json({ message: "success", token });
  } else {
    return next(new AppError("incorrect email or password", 409));
  }
});

export const protectedRoutes = catchError(async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return next(new AppError("token not provided", 401));
  }

  const decoded = await jwt.verify(token, "sasadanceonmsasa");

  const user = await userModel.findById(decoded.id);
  if (!user) {
    return next(new AppError("user has been deleted", 401));
  }

  if (user.passwordChangedAt) {
    const changePasswordDate = parseInt(
      user.passwordChangedAt.getTime() / 1000
    );
    if (changePasswordDate > decoded.iat)
      return next(new AppError("invalid token", 401));
  }

  req.user = user;
  next();
});

export const allowedTo = (...roles) => {
  return catchError(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("you are not authorized to do this action", 401)
      );
    }
    next();
  });
};
