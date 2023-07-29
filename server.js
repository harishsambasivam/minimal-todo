// env variables config
import dotenv from "dotenv";
dotenv.config();

// setup logger
import { contextMiddleware, logger } from "./utils/logger.js";
global.logger = logger;

// express server setup
import express from "express";

export const createServer = function () {
  const server = express();
  server.use(contextMiddleware);
  server.use(express.json());
  return server;
};
