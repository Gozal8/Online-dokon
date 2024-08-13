import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
} from "../controller/category.controller.js";

export const categoryRoutes = Router();

categoryRoutes
  .get("/", getAllCategory)
  .post("/add", createCategory)
  .delete("/delete/:categoryId", deleteCategory)
