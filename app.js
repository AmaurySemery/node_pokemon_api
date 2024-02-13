const express = require('express')

const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello, Express !'))

app.get('/api/pokemon/:id/:name', (req, res) => {
    const id = req.params.id
    const name = req.params.name
    res.send(`Vous avez demandé le pokémon n°${id} est ${name}.`)
})

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))