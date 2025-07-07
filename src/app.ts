import express, { Request, Response, Application } from "express";
import cors from "cors";
import { productRouter } from "./app/modules/products/product.controller";

export const app: Application = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Routes
app.use("/api/v1/products", productRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Shohoj Buy Server",
  });
});
