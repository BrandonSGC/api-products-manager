import { Request, Response } from "express";
import Product from "../models/Product";
import colors from "colors";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({products});
    
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error has occurred getting the products..." });
    console.error(
      colors.red("An error has occurred getting the products"),
      error
    );
  }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ message: "Product Created...", product: product });
    console.log(colors.cyan("Product created successfully..."));

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
