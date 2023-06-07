
//          Copyright Martin Prätzlich 2023 - 2023.
// Distributed under the Boost Software License, Version 1.0.
//    (See accompanying file LICENSE_1_0.txt or copy at
//          https://www.boost.org/LICENSE_1_0.txt)

const express = require('express')
const fs = require('fs')

const PORT = process.env.PORT || 3000
const BEARER_TOKEN = process.env.BEARER_TOKEN || `unsEcUrE-ToKeN123`

const app = express()

const logger = (req, res, next) => {
    const method = req.method
    const url = req.url
    const time = new Date().toISOString()
    console.log(time, method, url)
    next()
}

app.use(logger)
app.use(express.json())
app.use(express.static(__dirname + '/app'))

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader && authHeader !== `Bearer ${BEARER_TOKEN}`) {
        res.status(401).send('Authentication failed')
        return
    }
    next()
}

app.post('/entry/', authenticate, (req, res) => {
    const newEntry = req.body

    if (!newEntry.url) {
        res.status(400).send('Missing URL')
        return
    }

    if (!newEntry.slug) {
        newEntry.slug = Math.random().toString(36).substring(2, 8)
    }

    const data = JSON.parse(fs.readFileSync(`./data.json`))

    if (data[newEntry.slug]) {
        res.status(409).send('Slug already exists')
        return
    }

    data[newEntry.slug] = newEntry.url

    fs.writeFileSync('./data.json', JSON.stringify(data))
    res.status(201).send(`${req.protocol}://${req.hostname}/${newEntry.slug}`)
})

app.get('/:slug', (req, res) => {
    const data = JSON.parse(fs.readFileSync(`./data.json`))
    const slug = req.params.slug
    const entry = data.find(entry => entry.slug === slug)

    if (!entry) {
        res.status(404).send('Entry not found')
        return
    }

    res.redirect(entry.url)
})

app.delete('/entry/:slug', authenticate, (req, res) => {
    const slug = req.params.slug
    const data = JSON.parse(fs.readFileSync(`./data.json`))

    if (!data[slug]) {
        res.status(404).send('Entry not found')
        return
    }

    delete data[slug]
    fs.writeFileSync('./data.json', JSON.stringify(data))
    res.status(204).send()
})

app.get('/entries', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./app/data.json'))
    res.json(data)
})


app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})