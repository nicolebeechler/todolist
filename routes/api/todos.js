const express = require('express')
const router = express.Router()
const todoCtrl = require('../../controllers/api/todos')

// router.post('/', userController.createUser)
// router.post('/login', userController.loginUser)
// router.put('/:id', userController.updateUser)
// router.delete('/:id', userController.auth, userController.deleteUser)

// module.exports = router

// Index /api/todos
router.get('/', todoCtrl.indexNotComplete, todoCtrl.jsonTodos) 

// Index /api/todos/completed
router.get('/completed', todoCtrl.indexComplete, todoCtrl.jsonTodos)

// Delete /api/todos/:id
router.delete('/:id', todoCtrl.destroy, todoCtrl.jsonTodo)

// Update /api/todo/:id
router.put('/:id', todoCtrl.update, todoCtrl.jsonTodo)

// Create /api/todos
router.post('/', todoCtrl.create, todoCtrl.jsonTodo)

// Show /api/todos/:id
router.get('/:id', todoCtrl.show, todoCtrl.jsonTodo)

module.exports = router