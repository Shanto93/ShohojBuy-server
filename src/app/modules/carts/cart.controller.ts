import express, { Request, Response } from "express";
import { Cart } from "./cart.model";

export const CartRouter = express.Router();

// 🔹 GET all cart items
CartRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const cartItems = await Cart.find();
    res.status(200).json({
      success: true,
      message: "Cart items retrieved successfully",
      data: cartItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get cart items",
      error: error instanceof Error ? error.message : error,
    });
  }
});

// 🔹 POST add item to cart
CartRouter.post("/", async (req: Request, res: Response) => {
  try {
    const newCartItem = await Cart.create(req.body);
    res.status(201).json({
      success: true,
      message: "Item added to cart",
      data: newCartItem,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to add item to cart",
      error: error instanceof Error ? error.message : error,
    });
  }
});

// 🔹 DELETE cart item by ID
CartRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedItem = await Cart.findByIdAndDelete(id);
    if (!deletedItem) {
      res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      data: deletedItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete cart item",
      error: error instanceof Error ? error.message : error,
    });
  }
});

// PATCH: update quantity
CartRouter.patch("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const updated = await Cart.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ success: false, message: "Item not found" });
    }

    res.status(200).json({
      success: true,
      message: "Quantity updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update quantity",
      error: error instanceof Error ? error.message : error,
    });
  }
});
