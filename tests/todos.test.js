// the packages and variables needed for setup
const request = require('supertest') // this is the thing that lets us run our code like postman
const { MongoMemoryServer } =  require('mongodb-memory-server')// this creates the fake mongodb databse that exists on our computer in our memory not on atlas
const app = require('../app') // this is our api application that we made with express this is the thing that we are giving to supertest to test
const User = require('../models/user') // this is for us to be able to do crud operation on the User
const mongoose = require('mongoose')
const server = app.listen(8080, () => console.log('Testing on Port 8080'))
let mongoServer 


beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true })
})

afterAll(async () => {
    await mongoose.connection.close()// shut off mongoose connection with mongodb
    mongoServer.stop()
    server.close()
})



describe('Test suite for the /todos routes on our api', () => {
    // /todos
    test('It should create a new To Do in the db', async () => {
        const response = await request(app).post('/todos').send({ title: 'Supertest To Do', description: 'It is a super To Do', completed: false })

        expect(response.statusCode).toBe(200)
        expect(response.body.todo.title).toEqual('Supertest To Do')
        expect(response.body.todo.description).toEqual('It is a super To Do')
        expect(response.body.todo.completed).toEqual(true)
        expect(response.body).toHaveProperty('token')

    })

    // /todos/:id update
    test('It should update a To Do', async () => {
        const user = new User({ title: 'Supertest To Do', description: 'It is a super To Do', completed: false })
        await user.save()
        const token = await user.generateAuthToken()
    
        const response = await request(app)
          .put(`/todos/${todo._id}`)
          .set('Authorization', `Bearer ${token}`)
          .send({ title: 'Another Supertest', description: 'A completed Supertest', completed: true })
        
        expect(response.statusCode).toBe(200)
        expect(response.body.title).toEqual('Another Supertest')
        expect(response.body.description).toEqual('A completed Supertest')
        expect(response.body.completed).toEqual(true)
      })

    // /todos/:id delete
    test('It should delete a to do', async () => {
        const user = new User({ title: 'Supertest To Do', description: 'It is a super To Do', completed: false })
        await user.save()
        const token = await user.generateAuthToken()
    
        const response = await request(app)
          .delete(`/users/${user._id}`)
          .set('Authorization', `Bearer ${token}`)
        
        expect(response.statusCode).toBe(200)
        expect(response.body.message).toEqual('To Do deleted')
      })
})