const { urlencoded } = require('express')
const express = require('express')
const mongoose = require('mongoose')
const shorten = require('./models/shorten')
const app =  express()

mongoose.connect('mongodb://localhost/urlShortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(urlencoded({extended: false}))

app.get('/', async (req, res) => {
    const shortUrls = await shorten.find()
    res.render('index', {shortUrls: shortUrls})
})

app.post('/shorten', async (req, res) => {
    await shorten.create({full: req.body.fullUrl})
    res.redirect('/')
})

app.get('/:shorten', async (req, res) => {
    const shortUrl = await shorten.findOne({ short: req.params.shorten})
    if(shortUrl === null) return res.sendStatus(404)

    shortUrl.clicks++
    shortUrl.save()

    res.redirect(shortUrl.full)
})

app.listen(process.env.PORT || 5000)