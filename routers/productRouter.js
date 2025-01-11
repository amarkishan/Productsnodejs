import { addProduct,showProducts } from "../controllers/productController.js";
import express from "express";

const productRouter = express.Router();

productRouter.get("/all",showProducts);
productRouter.post("/add",addProduct);

export default productRouter;
