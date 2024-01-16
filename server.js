require('dotenv').config()
const express = require('express') 
const mongoose = require('mongoose')
const jsxEngine = require('jsx-view-engine')
const methodOverride = require('method-override')
const Todo = require('./models/todo')
const PORT = process.env.PORT || 8000

const app = express()

app.use(express.urlencoded({ extended: true })) // build a ssr website
// app.use(express.json()) build an api
app.use(methodOverride('_method'))
app.set('view engine', 'jsx')
app.engine('jsx', jsxEngine())

mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once('open', () => {
    console.log('connected to mongodb')
})

app.get('/', function (req, res) {
    res.send(`
    <h1>To Do List</h1>
    <h2><a href="/todos/new">Create To Do</a></h2>
    `)
})

// INDUCES

// INDEX

app.get('/todos', async (req, res) => {
    try {
        const foundTodos = await Todo.find({})
        res.render('todos/Index', {
            todos: foundTodos
        })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})

// NEW

app.get('/todos/new', (req, res) => {
    res.render('todos/New')
})

// DELETE

app.delete('/todos/:id', async (req, res) => {
    try{
        await Todo.findOneAndDelete({'_id': req.params.id})
            .then(() => {
                res.redirect('/todos')
            })
    }catch(error){
        res.status(400).send({ message: error.message })
    }
})

// UPDATE

app.put('/todos/:id', async (req, res) => {
    if (req.body.completed === 'on') {
        req.body.completed = true
    } else {
        req.body.completed = false
    }
    try {
        await Todo.findOneAndUpdate({'_id': req.params.id}, 
            req.body, {new: true})
            .then(() => {
                res.redirect(`/todos/${req.params.id}`)
            })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})

// CREATE

app.post('/todos', async (req, res) => {
    if (req.body.completed === 'on') {
        req.body.completed = true
    } else {
        req.body.completed = false
    }
    try {
        const createdTodo = await Todo.create(req.body)
        res.redirect(`/todos/${createdTodo._id}`)
    } catch(error) {
        res.status(400).send({message: error.message})
    }
})

// EDIT

app.get('/todos/:id/edit', async (req, res) => {
    try {
        const foundTodo = await Todo.findOne({_id: req.params.id})
        res.render('todos/Edit', {
            todo: foundTodo
        })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})

// SHOW

app.get('/todos/:id', async (req, res) => {
    try {
        const foundTodo = await Todo.findOne({_id: req.params.id})
        res.render('todos/Show', {
            todo: foundTodo
        })
    } catch (error) {
        res.status(400).send({ message: error.message})
    }
})

app.listen(PORT, () => {
    console.log(`Ayo the Port at ${PORT} is lit`)
})