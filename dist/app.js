"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_controller_1 = require("./app/modules/products/product.controller");
const cart_controller_1 = require("./app/modules/carts/cart.controller");
exports.app = (0, express_1.default)();
// Middleware
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173",
        "http://localhost:5173/",
        "https://shohoj-buy.vercel.app/",
        "https://shohoj-buy.vercel.app",
    ],
}));
// Routes
exports.app.use("/api/v1/products", product_controller_1.productRouter);
exports.app.use("/api/v1/carts", cart_controller_1.CartRouter);
exports.app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Shohoj Buy Server",
    });
});
