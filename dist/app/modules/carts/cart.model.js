"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const cartSchema = new mongoose_1.default.Schema({
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
}, {
    timestamps: true,
    versionKey: false,
});
exports.Cart = mongoose_1.default.model("Cart", cartSchema);
