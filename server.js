// env variables config
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import config from "./config/index.js";

// setup logger
import pino from "pino";
const logger = pino({
    level: config.logLevel
});
global.logger = logger;

export const createServer = function () {
  const server = express();
  server.use(express.json());
  return server;
}



