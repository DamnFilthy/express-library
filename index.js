const express = require('express');
const {v4: uuid} = require('uuid');

class Todo {
    constructor(id = uuid(), title = '', desc = '') {
        this.id = id
        this.title = title
        this.desc = desc
    }
}

const store = {
    todo: [
        {
            id: 1,
            title: 'test title 1',
            desc: 'test description 1'
        },
        {
            id: 2,
            title: 'test title 2',
            desc: 'test description 3'
        },
        {
            id: 3,
            title: 'test title 3',
            desc: 'test description 3'
        }
    ]
}

app = express()
app.use(express.json())

app.get('/api/todo', (req, res) => {
    const {todo} = store

    res.json(todo)
})

app.get('/api/todo/:id', (req, res) => {
    const {todo} = store
    const {id} = req.params
    const index = todo.findIndex(item => item.id === +id)

    if (index !== -1) {
        res.json(todo[index])
    } else {
        res.status(404)
        res.json('404 | запись не найдена')
    }
})

app.post('/api/todo', (req, res) => {
    const {todo} = store
    const {title, desc} = req.body

    const newTodo = new Todo(title, desc)
    todo.push(newTodo)

    res.status(201)
    res.json(newTodo)
})

app.put('/api/todo/:id', (req, res) => {
    const {todo} = store
    const {title, desc} = req.body
    const {id} = req.params

    const index = todo.findIndex(item => item.id === +id)

    if (index !== -1) {
        todo[index] = {
            ...todo[index],
            title,
            desc
        }
        res.status(201)
        res.json(todo[index])
    } else {
        res.status(404)
        res.json('404 | запись не найдена')
    }
})

app.delete('/api/todo/:id', (req, res) => {
    const {todo} = store
    const {id} = req.params

    const index = todo.findIndex(item => item.id === +id)

    if (index !== -1) {
        todo.splice(todo[index], 1)
        res.status(201)
        res.json('Запись была успешна удалена.')
    } else {
        res.status(404)
        res.json('404 | запись не найдена')
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT)