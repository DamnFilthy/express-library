const express = require('express')
const router = express.Router()
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
        this.fileCover = fileCover
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

const auth = {
    users: [
        {
            id: '1',
            name: 'root',
            role: 'admin',
            mail: 'test@mail.ru'
        }
    ]
}

router.get('/', (req, res) => {
    res.json({message: "Welcome to book API"})
})

router.post('/user/login', (req, res) => {
    const {users} = auth
    const {id} = req.query
    const index = users.findIndex(item => item.id === id)

    if (index !== -1) {
        res.status(201)
        res.json(users[index])
    } else {
        res.status(404)
        res.json({error: '404 | пользователя не существует'})
    }
})

router.get('/books', (req, res) => {
    const {books} = store
    res.status(200)
    res.json(books)
})

router.get('/books/:id', (req, res) => {
    const {books} = store
    const {id} = req.params
    console.log(id)
    const index = books.findIndex(item => item.id === id)

    if (index !== -1) {
        res.status(200)
        res.json(books[index])
    } else {
        res.status(404)
        res.json({error: '404 | книга не найдена'})
    }
})

router.post('/books', (req, res) => {
    const {books} = store
    const {title, description, authors, favorite, fileCover, fileName} = req.body

    if (!title || title === '') {
        res.sendStatus(404)
        return
    }

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName)

    books.push(newBook)

    res.status(201)
    res.json(newBook)
})

router.put('/books/:id', (req, res) => {
    const {books} = store
    const {title, description, authors, favorite, fileName, fileCover} = req.body
    const {id} = req.params

    if (!title || title === '') {
        res.sendStatus(400)
        return
    }
    const index = books.findIndex(item => item.id == id)

    if (index !== -1) {
        books[index] = {
            ...books[index],
            title,
            description,
            authors,
            favorite,
            fileName,
            fileCover,
        }
        res.status(204)
        res.json(books[index])
    } else {
        res.status(404)
        res.json({error: '404 | запись не найдена'})
    }
})

router.patch('/books/:id', (req, res) => {
    const {books} = store
    const {title} = req.body
    const {id} = req.params

    if (!title || title === '') {
        res.sendStatus(400)
        return
    }
    const index = books.findIndex(item => item.id == id)

    if (index !== -1) {
        books[index] = {
            ...books[index],
            ...req.body
        }
        res.status(204)
        res.json(books[index])
    } else {
        res.status(404)
        res.json({error: '404 | запись не найдена'})
    }
})

router.delete('/books/:id', (req, res) => {
    const {books} = store
    const {id} = req.params

    const index = books.findIndex(item => item.id == id)

    if (index !== -1) {
        books.splice(books[index], 1)
        res.status(201)
        res.json({success: 'Запись была успешна удалена.'})
    } else {
        res.status(404)
        res.json({error: '404 | запись не найдена'})
    }
})

router.delete('/__test__/data', (req, res) => {
    store.books = []
    res.sendStatus(204)
})

module.exports = router