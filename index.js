const express = require('express');
const {v4: uuid} = require('uuid');

class Book {
    constructor(
        title = '',
        description = '',
        authors = '',
        favorite = '',
        fileCover = '',
        fileName = '',
        id = uuid()
    ) {
        this.id = id
        this.title = title
        this.description = description
        this.authors = authors
        this.favorite = favorite
        this.fileName = fileName
    }
}

const store = {
    books: [
        {
            id: "1",
            title: "initial title",
            description: "initial description",
            authors: "initial authors",
            favorite: "initial favorite",
            fileCover: "initial fileCover",
            fileName: "initial fileName"
        }
    ]
}

const db = {
    users: [
        {
            id: '1',
            name: 'root',
            role: 'admin',
            mail: 'test@mail.ru'
        }
    ]
}

app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/api/user/login', (req, res) => {
    const {users} = db
    const {id} = req.query
    const index = users.findIndex(item => item.id == id)

    if (index !== -1) {
        res.status(201)
        res.json(users[index])
    } else {
        res.status(404)
        res.json('404 | пользователя не существует')
    }
})

app.get('/api/books', (req, res) => {
    const {books} = store
    res.json(books)
})

app.get('/api/books/:id', (req, res) => {
    const {books} = store
    const {id} = req.params
    const index = books.findIndex(item => item.id == id)

    if (index !== -1) {
        res.json(books[index])
    } else {
        res.status(404)
        res.json('404 | книга не найдена')
    }
})

app.post('/api/books', (req, res) => {
    const {books} = store
    const {title, description, authors, favorite, fileCover, fileName} = req.body
    const newBook = new Book(title, description, authors, favorite, fileCover, fileName)

    books.push(newBook)

    res.status(201)
    res.json(newBook)
})

app.put('/api/books/:id', (req, res) => {
    const {books} = store
    const {title, description, authors, favorite, fileCover, fileName} = req.body
    const {id} = req.params

    const index = books.findIndex(item => item.id == id)

    if (index !== -1) {
        books[index] = {
            ...books[index],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName
        }
        res.status(201)
        res.json(books[index])
    } else {
        res.status(404)
        res.json('404 | запись не найдена')
    }
})

app.delete('/api/books/:id', (req, res) => {
    const {books} = store
    const {id} = req.params

    const index = books.findIndex(item => item.id == id)

    if (index !== -1) {
        books.splice(books[index], 1)
        res.status(201)
        res.json('Запись была успешна удалена.')
    } else {
        res.status(404)
        res.json('404 | запись не найдена')
    }
})

const PORT = process.env.PORT || 5000
app.listen(PORT)