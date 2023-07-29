import express from "express";
const router = express.Router();

export function createTodoRouter(todoController){
    router.get("/healthcheck", (req,res) => res.send("ok"));
    router.post("/", todoController.createTodo);
    return router;
}