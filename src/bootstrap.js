import categoryRouter from "./modules/category/category.routes.js";
import subCategoryRouter from "./modules/subCategory/subCategory.routes.js";
import brandRouter from "./modules/brand/brand.routes.js";
import productRouter from "./modules/product/product.routes.js";
import userRouter from "./modules/user/user.routes.js";
import authRouter from "./modules/auth/auth.routes.js";
import reviewRouter from "./modules/review/review.routes.js";
import wishlistRouter from "./modules/wishlist/wishlist.routes.js";
import addressRouter from "./modules/address/address.routes.js";
import couponRouter from "./modules/coupon/coupon.routes.js";
import cartRouter from "./modules/cart/cart.routes.js";

import { AppError, globalErrorHandle } from "./middleware/ErrorHandling.js";
const bootstrap = (app) => {
  app.use("/categories", categoryRouter);
  app.use("/subCategories", subCategoryRouter);
  app.use("/brands", brandRouter);
  app.use("/products", productRouter);
  app.use("/users", userRouter);
  app.use("/auth", authRouter);
  app.use("/reviews", reviewRouter);
  app.use("/wishlist", wishlistRouter);
  app.use("/address", addressRouter);
  app.use("/coupons", couponRouter);
  app.use("/cart", cartRouter);

  app.all("*", (req, res, next) => {
    next(new AppError("wrong end point", 404));
  });
  app.use(globalErrorHandle);
};

export default bootstrap;
