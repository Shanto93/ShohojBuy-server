import mongoose from "mongoose";
import type { ICartProduct } from "./cart.interface";

const cartSchema = new mongoose.Schema<ICartProduct>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
    },
    quantity: { type: Number, default: 1 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Cart = mongoose.model<ICartProduct>("Cart", cartSchema);
