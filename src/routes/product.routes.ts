import { Router } from "express";
import { body, param } from "express-validator";
import {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  updateAvailability,
  deleteProduct,
} from "../controllers/product.controller";
import { handleInputErrors } from "../middlewares";

const router = Router();

router.get("/", getProducts);

router.get(
  "/:id",
  param("id")
    .isInt()
    .withMessage("Id is invalid")
    .custom((id) => id >= 0)
    .withMessage("Id must be positive"),
  handleInputErrors,
  getProductsById
);

router.post(
  "/",
  // Validation
  // Note: body() does exactly what check() does, however
  // you use it when you cannot use async await
  body("name").notEmpty().withMessage("Name cannot be empty"),
  body("price")
    .isNumeric()
    .withMessage("Price must be a number")
    .custom((value) => value >= 0)
    .withMessage("Price cannot be negative")
    .notEmpty()
    .withMessage("Price cannot be empty"),
  handleInputErrors,
  createProduct
);

router.put(
  "/:id",
  body("name").notEmpty().withMessage("Name cannot be empty"),
  body("price")
    .isNumeric()
    .withMessage("Price must be a number")
    .custom((value) => value >= 0)
    .withMessage("Price cannot be negative")
    .notEmpty()
    .withMessage("Price cannot be empty"),
  body("availabilty").isBoolean().withMessage("Availability is invalid"),
  handleInputErrors,
  updateProduct
);

router.patch(
  "/:id",
  // We can also vaildate params with param("paramName")
  param("id")
    .isInt()
    .withMessage("Id is invalid")
    .custom((id) => id >= 0)
    .withMessage("Id must be positive"),
  handleInputErrors,
  updateAvailability
);

router.delete(
  "/:id",
  param("id")
    .isInt()
    .withMessage("Id is invalid")
    .custom((id) => id >= 0)
    .withMessage("Id must be positive"),
  handleInputErrors,
  deleteProduct
);

export default router;
