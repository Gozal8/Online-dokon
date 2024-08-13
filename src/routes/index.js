import {Router} from "express";
import { categoryRoutes } from "./category.routes.js"
import { productRoutes } from "./product.routes.js";
import {customerRoutes} from "./customer.routes.js";
export const routes = Router();

routes.use("/categories", categoryRoutes)
.use("/customers", customerRoutes)
.use("/products", productRoutes);


















