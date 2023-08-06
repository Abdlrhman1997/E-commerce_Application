import categoryRouter from "./modules/category/category.routes.js";
const bootstrap = (app) => {
  app.use("/categories", categoryRouter);

  app.use((err, req, res, next) => {
    res.status(500).json(err);
  });
};

export default bootstrap;
