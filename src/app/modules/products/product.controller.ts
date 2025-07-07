import express, { Request, Response } from "express";
import { Product } from "./product.model";

export const productRouter = express.Router();

// GET all products
productRouter.get("/", async (req: Request, res: Response) => {
  try {
    const allData = await Product.find();
    res.status(200).json({
      message: "Retrieved all products",
      success: true,
      data: allData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Retrieved all products",
      error: error instanceof Error ? error.message : error,
    });
  }
});

// POST create new product
productRouter.post("/create-product", async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const newProduct = await Product.create(productData);

    res.status(201).json({
      message: "Product created successfully",
      success: true,
      data: newProduct,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create product",
      error: error instanceof Error ? error.message : error,
    });
  }
});

// GET a single product by ID
productRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Retrieved single product",
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving product",
      error: error instanceof Error ? error.message : error,
    });
  }
});
