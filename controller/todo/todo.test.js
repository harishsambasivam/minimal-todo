import request from "supertest";
import { createServer } from "../../server.js";
import { TodoDAO } from "../../data/todo/todo.js";
import { TodoService } from "../../service/todo/todo.js";
import { TodoController } from "./todo.js";
import { describe, expect, it, vi } from 'vitest'
import { createTodoRouter } from "../../routes/todoRouter.js";

// mocks
const mockCreateTodo = vi.fn(({data}) => {
  return { id: 1, ...data }; 
});

const todoDAO = new TodoDAO({
  todo: {
    create: mockCreateTodo
  }
});
const todoService = new TodoService(todoDAO);
const todoController = new TodoController(todoService);
const todoRouter = createTodoRouter(todoController);
const server = createServer();
server.use("/api/v1/todo", todoRouter);


const expectedResponseKeys = ['success', 'data', 'error'];

describe("Todo API Endpoints", () => {
  it("should create a todo", async function () {
    const payload = {
        title: "take rest",
        userId : "64c4aa87837f0c1720fc4b5a"
    }
    const response = await request(server).post("/api/v1/todo").send(payload);
    expect(response.statusCode).toBe(200);
     // Check if the response body has all the expected keys
     for (const key of expectedResponseKeys) {
        expect(response.body).toHaveProperty(key);
      }
      expect(response.body.data).toHaveProperty("title");
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data.id).toBe(1);
      expect(response.body.data.title).toBe("take rest");
  });
});
