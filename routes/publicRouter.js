const express = require('express')
const publicRouter = express.Router()
const {store} = require('./apiRouter')

publicRouter.get('/books', (req, res) => {
    const {books} = store
    res.status(200)
    res.render('book/index', {
        title: 'Books',
        pageTitle: 'Список Книг',
        books
    })
})

publicRouter.get('/books/:id', (req, res) => {
    const {books} = store
    const {id} = req.params
    const index = books.findIndex(item => item.id === id)

    if (index !== -1) {
        res.status(200)
        res.render('book/view', {
            title: books[index].title,
            pageTitle: books[index].title,
            book: books[index]
        })
    } else {
        res.status(404)
        res.json({error: '404 | книга не найдена'})
    }
})

publicRouter.get('/add-book', (req, res) => {
    res.status(200)
    res.render('book/create', {
        title: 'Create Book',
        pageTitle: 'Создать Книгу'
    })
})
module.exports = publicRouter