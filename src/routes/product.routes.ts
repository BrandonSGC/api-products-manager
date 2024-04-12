import { Router } from "express";
import { body } from 'express-validator';
import { getProducts, createProduct } from "../controllers/product.controller";

const router = Router();

router.get('/', getProducts);

router.post("/",
  // Validation
  // Note: body() hace exactamente lo mismo que check(), solo que se
  // utiliza cuando no se puede usar el async await.
  body("name").notEmpty().withMessage("Name cannot be empty"),
  body("price")
    .isNumeric()
    .withMessage("Price must be a number")
    .custom((value) => value >= 0)
    .withMessage("Price cannot be negative")
    .notEmpty()
    .withMessage("Price cannot be empty"),

  createProduct
);

export default router;
