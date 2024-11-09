let { todos } = require("../store")

const todoAdd = (title, content) => {
    let todoId = todos.length ? todos[todos.length - 1].id + 1 : 1

    const newTodo = {
        id: todoId,
        title,
        content
    }

    todos.push(newTodo)

    return newTodo
}

const todoPut = (title, content, id, index) => {
    const item = { id, title, content }

    todos[index] = item

    return item
}

const todoPatch = (obj ,obj1) => {
    for (const [key, value] of Object.entries(obj1)) {
        obj[key] = value
    }

    return obj
}   

const todoDelete = async (id) => {
    todos = todos.filter(item => item.id !== id)
    return todos
}

module.exports = {
    todoAdd,
    todoPut,
    todoPatch,
    todoDelete
}