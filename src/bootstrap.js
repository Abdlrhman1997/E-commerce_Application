import categoryRouter from "./modules/category/category.routes.js";
import { AppError } from "./utils/ErrorHandling.js";
const bootstrap = (app) => {
  app.use("/categories", categoryRouter);

  app.all("*", (req, res, next) => {
    next(new AppError("wrong end point", 404));
  });
  app.use((err, req, res, next) => {
    const error = err.message;
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ error });
  });
};

export default bootstrap;
