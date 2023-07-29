import { createServer } from "./server.js";
import config from "./config/index.js";
import { PrismaClient } from '@prisma/client';
import { TodoDAO } from "./data/todo/todo.js";
import { TodoService } from "./service/todo/todo.js";
import { TodoController } from "./controller/todo/todo.js";
import { createTodoRouter } from "./routes/todoRouter.js";

const prisma = new PrismaClient()
const { port } = config;
const server = createServer();

const todoDAO = new TodoDAO(prisma);
const todoService = new TodoService(todoDAO);
const todoController = new TodoController(todoService);
const todoRouter = createTodoRouter(todoController);

server.use("/api/v1/todo", todoRouter);

server.listen(port, () => {
  logger.info(`server started on PORT ${port}`);
});
