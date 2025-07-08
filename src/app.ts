import express, { Request, Response, Application } from "express";
import cors from "cors";
import { productRouter } from "./app/modules/products/product.controller";
import { CartRouter } from "./app/modules/carts/cart.controller";

export const app: Application = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5173/",
      "https://shohoj-buy.vercel.app/",
      "https://shohoj-buy.vercel.app",
    ],
  })
);

// Routes
app.use("/api/v1/products", productRouter);
app.use("/api/v1/carts", CartRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Shohoj Buy Server",
  });
});
