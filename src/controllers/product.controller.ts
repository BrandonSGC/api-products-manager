import { Request, Response } from "express";
import Product from "../models/Product";
import colors from "colors";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({ products });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error has occurred getting the products..." });
    console.error(
      colors.red("An error has occurred getting the products"),
      error
    );
  }
};

export const getProductsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error has occurred getting the product..." });
    console.error(
      colors.red("An error has occurred while getting the product")
    );
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res
      .status(201)
      .json({ message: "Product created successfully...", product: product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error has occurred creating the product..." });
    console.error(
      colors.red("An error has occurred creating the product"),
      error
    );
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.update(req.body); // -> Update the register but doesn't in the DB.
    await product.save(); // -> Save the updated product in the DB.

    res.status(200).json({ message: "Product updated succesfully", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error has occurred updating the product..." });
    console.error(
      colors.red("An error has occurred white updating the product.")
    );
  }
};

export const updateAvailability = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.availability = !product.dataValues.availability;
    await product.save();

    res
      .status(200)
      .json({ message: "Availability updated succesfully", product });
  } catch (error) {
    res.status(500).json({
      message: "An error has occurred updating the product's availability...",
    });
    console.error(
      colors.red("An error has occurred white updating product's availability.")
    );
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.destroy();
    res.status(200).json({ message: "Product deleted succesfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error has occurred deleting the product..." });
    console.error(colors.red("An error has occurred deleting the product..."));
  }
};
