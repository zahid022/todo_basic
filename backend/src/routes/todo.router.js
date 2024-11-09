const express = require("express")
const { todoList, createTodo, updateTodoPut, updateTodoPatch, deleteTodo, todoById } = require("../controllers/todo.controller")

const todoRouter = express.Router()

todoRouter.get("/", todoList)

todoRouter.get("/:id", todoById)

todoRouter.post("/", createTodo)

todoRouter.put("/:id", updateTodoPut)

todoRouter.patch("/:id", updateTodoPatch)

todoRouter.delete("/:id", deleteTodo)

module.exports = todoRouter