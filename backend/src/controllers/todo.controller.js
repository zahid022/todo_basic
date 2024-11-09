const { todoAdd, todoPut, todoPatch, todoDelete } = require("../services/todo.service")
let { todos } = require("../store")

const todoList = (req, res) => {
    res.json(todos)
}

const todoById = (req, res) => {
    const id = +req.params.id

    let todo = todos.find(item => item.id === id)

    if (!todo) return res.status(404).json({ message: "Todo is not found" })

    res.json(todo)

}

const createTodo = (req, res) => {
    try {
        const { title, content } = req.body

        if (!title || !content) {
            res.status(400).json({ message: "title and content is required" })
            return
        }

        const newTodo = todoAdd(title, content)

        res.json(newTodo)

    } catch (error) {
        console.error("Create todo error", error)
        res.status(500).json({ error: 'Failed to create todo' })
    }
}

const updateTodoPut = (req, res) => {
    try {
        const id = +req.params.id
        const { title, content } = req.body

        const index = todos.findIndex(item => item.id === id)

        if (index === -1) return res.status(401).json({ message: "Todo is not found" })

        if (!title || !content) return res.status(401).json({ message: "title and content is required" })

        const updateTodo = todoPut(title, content, id, index)

        res.json(updateTodo)

    } catch (error) {
        console.error("Update todo error", error)
        res.status(500).json({ error: 'Failed to update todo' })
    }

}

const updateTodoPatch = (req, res) => {
    try {
        const body = req.body
        const id = +req.params.id

        let todo = todos.find(item => item.id === id)

        if (!todo) return res.status(404).json({ error: "todo is not found" })

        let updateTodo = todoPatch(todo, body)

        res.json(updateTodo)

    } catch (error) {
        console.error("Update todo error", error)
        res.status(500).json({ error: 'Failed to update todo' })
    }
}

const deleteTodo = async (req, res) => {
    try {
        const id = +req.params.id

        let todo = todos.find(item => item.id === id)

        if (!todo) return res.status(404).json({ error: "todo is not found" })
        todos = await todoDelete(id)

        res.json({ message: "Todo deleted is successfully", todos })

    } catch (error) {
        console.error("Delete todo error", error)
        res.status(500).json({ error: 'Failed to delete todo' })
    }
}

module.exports = {
    todoList,
    createTodo,
    updateTodoPut,
    updateTodoPatch,
    deleteTodo,
    todoById
}