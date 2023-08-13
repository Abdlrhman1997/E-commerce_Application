import { catchError } from "../../middleware/ErrorHandling.js";
import { AppError } from "../../middleware/ErrorHandling.js";
export const deleteOne = (model) => {
  return catchError(async (req, res, next) => {
    const { id } = req.params;
    const document = await model.findByIdAndDelete(id);

    !document && next(new AppError("document doesn't exist", 404));
    document && res.status(200).json({ message: `success`, document });
  });
};
