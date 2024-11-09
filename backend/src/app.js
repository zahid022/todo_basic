const express = require("express")
const todoRouter = require("./routes/todo.router")
const cors = require('cors');

const app = express()

app.use(cors());

app.use(express.json())

app.get('/', (req,res) => {
    res.json({message : "Todo 3001 port"})
})

app.use('/todo', todoRouter)

app.listen(3001, () => {
    console.log("Todo application running successfully")
})