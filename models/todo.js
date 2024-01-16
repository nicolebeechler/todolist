const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const todoSchema = new mongoose.Schema({
    title: { type: String, require: true },
    description: { type: String, require: true }, 
    completed: Boolean
}, 
{
    timestamps: true
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
