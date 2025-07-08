"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRouter = void 0;
const express_1 = __importDefault(require("express"));
const cart_model_1 = require("./cart.model");
exports.CartRouter = express_1.default.Router();
// 🔹 GET all cart items
exports.CartRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartItems = yield cart_model_1.Cart.find();
        res.status(200).json({
            success: true,
            message: "Cart items retrieved successfully",
            data: cartItems,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get cart items",
            error: error instanceof Error ? error.message : error,
        });
    }
}));
// 🔹 POST add item to cart
exports.CartRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCartItem = yield cart_model_1.Cart.create(req.body);
        res.status(201).json({
            success: true,
            message: "Item added to cart",
            data: newCartItem,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to add item to cart",
            error: error instanceof Error ? error.message : error,
        });
    }
}));
// 🔹 DELETE cart item by ID
exports.CartRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedItem = yield cart_model_1.Cart.findByIdAndDelete(id);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete cart item",
            error: error instanceof Error ? error.message : error,
        });
    }
}));
// PATCH: update quantity
exports.CartRouter.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const updated = yield cart_model_1.Cart.findByIdAndUpdate(id, { quantity }, { new: true });
        if (!updated) {
            res.status(404).json({ success: false, message: "Item not found" });
        }
        res.status(200).json({
            success: true,
            message: "Quantity updated successfully",
            data: updated,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update quantity",
            error: error instanceof Error ? error.message : error,
        });
    }
}));
