import express from "express";
import userRouter from "./userRouter.js";
import categoryRouter from "./categoryRouter.js";
import productRouter from "./productRouter.js";
import variantRouter from "./variantRouter.js";
import cartRouter from "./cartRouter.js";
import orderRouter from "./orderRouter.js";

const apiRouter = express.Router();
apiRouter.use("/v1/apiUser", userRouter); //     USER_ROUTE
apiRouter.use("/v1/apiCategory", categoryRouter); //     USER_ROUTE
apiRouter.use("/v1/apiProduct", productRouter);
apiRouter.use("/v1/apiVariant", variantRouter);
apiRouter.use("/v1/apiCart", cartRouter); //     USER_ROUTE
apiRouter.use("/v1/apiOrder", orderRouter); //     USER_ROUTE
export default apiRouter;
