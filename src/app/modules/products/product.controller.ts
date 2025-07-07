import express, { Request, Response } from "express";
import { Product } from "./product.model";
export const productRouter = express.Router();

productRouter.get("/", async (req: Request, res: Response) => {
  const allData = await Product.find();
  res.status(201).json({
    message: "Retrived all products",
    success: true,
    data: allData,
  });
});
