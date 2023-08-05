import categoryRouter from "./modules/category/category.routes.js";
const bootstrap = (app) => {
  app.use("/categories", categoryRouter);
};

export default bootstrap;
