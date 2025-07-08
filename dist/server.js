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
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./app/config/env");
const app_1 = require("./app");
let server;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(env_1.EnvConfig.DB_URL);
        console.log("Shohoj Buy is connected");
        server = app_1.app.listen(env_1.EnvConfig.PORT, () => {
            console.log(`Shohoj Buy app listening on port ${env_1.EnvConfig.PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
startServer();
process.on("unhandledRejection", (error) => {
    console.log("Unhandled Rejection Error...Server is Shutting Down", error);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on("uncaughtException", (error) => {
    console.log("UnCaught Exception Error...Server is Shutting Down", error);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on("SIGTERM", () => {
    console.log("SIGTERM Signal received...Server is Shutting Down");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
