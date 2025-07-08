import express, { Request, Response } from "express";
import { Cart } from "./cart.model";

export const CartRouter = express.Router();

// POST create new product
CartRouter.post("/", async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const newProduct = await Cart.create(productData);

    res.status(201).json({
      message: "Product add to Cart Successfully",
      success: true,
      data: newProduct,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to add to cart",
      error: error instanceof Error ? error.message : error,
    });
  }
});
