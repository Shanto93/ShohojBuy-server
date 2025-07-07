/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { EnvConfig } from "./app/config/env";


let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(EnvConfig.DB_URL);
    console.log("Shohoj Buy is connected");

    server = app.listen(EnvConfig.PORT, () => {
      console.log(`Shohoj Buy app listening on port ${EnvConfig.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

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