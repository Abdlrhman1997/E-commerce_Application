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