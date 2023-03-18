import express from "express";
import productsController from "../controllers/products.controller";

const router = express.Router();

router
  .get("/products", productsController.getAllProducts)
  .get("/products/:id", productsController.getProductById)
  .post("/products", productsController.saveProduct)
  .put("/products/:id", productsController.updateProduct)
  .delete("/products/:id", productsController.deleteProductById)

export default router