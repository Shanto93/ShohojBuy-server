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
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const product_model_1 = require("./product.model");
exports.productRouter = express_1.default.Router();
// GET all products
exports.productRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allData = yield product_model_1.Product.find();
        res.status(200).json({
            message: "Retrieved all products",
            success: true,
            data: allData,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error Retrieved all products",
            error: error instanceof Error ? error.message : error,
        });
    }
}));
// POST create new product
exports.productRouter.post("/create-product", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const newProduct = yield product_model_1.Product.create(productData);
        res.status(201).json({
            message: "Product created successfully",
            success: true,
            data: newProduct,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to create product",
            error: error instanceof Error ? error.message : error,
        });
    }
}));
// GET a single product by ID
exports.productRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield product_model_1.Product.findById(id);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving product",
            error: error instanceof Error ? error.message : error,
        });
    }
}));
// DELETE a product by ID
exports.productRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedProduct = yield product_model_1.Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: deletedProduct,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting product",
            error: error instanceof Error ? error.message : error,
        });
    }
}));
// Update a product by ID
exports.productRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedProduct = yield product_model_1.Product.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
        });
        if (!updatedProduct) {
            res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update product",
            error: error instanceof Error ? error.message : error,
        });
    }
}));
