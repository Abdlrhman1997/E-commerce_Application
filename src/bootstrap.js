import categoryRouter from "./modules/category/category.routes.js";
import subCategoryRouter from "./modules/subCategory/subCategory.routes.js";
import { AppError, globalErrorHandle } from "./middleware/ErrorHandling.js";
const bootstrap = (app) => {
  app.use("/categories", categoryRouter);
  app.use("/subCategories", subCategoryRouter);

  app.all("*", (req, res, next) => {
    next(new AppError("wrong end point", 404));
  });
  app.use(globalErrorHandle);
};

export default bootstrap;
