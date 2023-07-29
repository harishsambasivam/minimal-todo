import request from "supertest";
import jest from 'jest'
import { createServer } from "../../server.js";
import { TodoDAO } from "../../data/todo/todo.js";
import { TodoService } from "../../service/todo/todo.js";
import { TodoController } from "./todo.js";

// mocks

const mockCreateTodo = jest.fn(({data}) => {
  // Here you can return a mocked result or a Promise.resolve() if needed
  return { id: 1, ...data }; // For example, return an object with an ID
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
  test("should create a todo", async function () {
    const payload = {
        title: "do yoga",
        userId : "64c4aa87837f0c1720fc4b5a"
    }
    const response = await request(server).post("/api/v1/todoService").send(payload);
    expect(response.statusCode).toBe(200);
     // Check if the response body has all the expected keys
     for (const key of expectedResponseKeys) {
        expect(response.body).toHaveProperty(key);
      }
      expect(response.body.data).toHaveProperty("title");
      expect(response.body.data).toHaveProperty("id");

  });
});
