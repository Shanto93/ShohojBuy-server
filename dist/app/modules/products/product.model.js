"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
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
}, {
    timestamps: true,
    versionKey: false,
});
exports.Product = mongoose_1.default.model("Product", productSchema);
