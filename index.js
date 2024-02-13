const express = require('express')
const app = express()
const port = 3000
app.use(express.json())

const nombres = [
    { id: 1, nombre: "Juan", whatsapp: 3332232333},
    { id: 2, nombre: "María", whatsapp: 3315009132},
    { id: 3, nombre: "Lucas", whatsapp: 3332231500}
]

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.get('/', (req, res) => {
    res.send(nombres)
})

app.get('/getIndexado/:id', (req, res) => {
    const id = req.params.id
    
    const buscar = nombres.findIndex((h) => h.id == id)
    if (buscar < 0) {
        return res.status(404).send("No se encontró el nombre")
    }
    const registro = nombres[buscar]
    
    res.send(registro)
})

app.post('/post', (req, res) => {
    let id = req.body.id
    let nombre = req.body.nombre
    let whatsapp = req.body.whatsapp
    nombres.push({ id, nombre, whatsapp })
    res.send(nombres)
})

app.patch('/patch/:id', (req, res) => {
    const update = req.body
    const id = req.params.id
    
    const index = nombres.findIndex((h) => h.id == id)
    if (index < 0) {
        return res.status(404).send("No se encontró el nombre")
    }
    const modificar = nombres[index]
    
    Object.assign(modificar, update)
    
    res.send(nombres)
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    
    const index = nombres.findIndex((h) => h.id == id)
    if (index < 0) {
        return res.status(404).send("No se encontró el nombre")
    }
    nombres.splice(index, 1)
    
    res.send(nombres)
})