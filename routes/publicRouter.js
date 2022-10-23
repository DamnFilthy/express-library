const express = require('express')
const publicRouter = express.Router()

publicRouter.get('/', (req, res) => {
    res.status(200)
    res.render('home/home', {
        title: 'Home-page',
        pageTitle: 'Welcome to home page'
    })
})


module.exports = publicRouter