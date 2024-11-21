const fs = require('fs')
const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())
app.listen(3000, console.log("¡Servidor encendido! Ingresa aquí http://localhost:3000"))

//Rutas
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

//Rutas Canciones
app.get("/canciones", (req, res) => {
    const canciones = JSON.parse(fs.readFileSync("canciones.json"))
    res.json(canciones)
})

app.post("/canciones", (req, res) => {
    const cancion = req.body
    const canciones = JSON.parse(fs.readFileSync("canciones.json"))
    canciones.push(cancion)
    fs.writeFileSync("canciones.json", JSON.stringify(canciones, null, 4))
    res.send("Canción agregada con éxito!")
})

app.delete("/canciones/:id", (req, res) => {
    const { id } = req.params
    const canciones = JSON.parse(fs.readFileSync("canciones.json"))
    const index = canciones.findIndex(p => p.id == id)
    //const index = canciones.findIndex(p => p.id === Number(id))
    //if (index === -1) return res.status(404).send("Canción no encontrada")
    canciones.splice(index, 1)
    fs.writeFileSync("canciones.json", JSON.stringify(canciones, null, 4))
    res.send("Canción eliminada con éxito")
    })

app.put("/canciones/:id", (req, res) => {
    //const { id } = req.params
    //const cancion = req.body
    const id = Number(req.params.id) //Convienrte id a numero
    const cancion = { ...req.body, id } // Sobre escribe id como numero
    //Lo cambié a número porque noté que al editar la id se transformaba a string y lo cuál podria generar conflicto para eliminar canciones.
    const canciones = JSON.parse(fs.readFileSync("canciones.json"))
    const index = canciones.findIndex(p => p.id == id)
    //const index = canciones.findIndex(p => p.id === Number(id))
    //if (index === -1) return res.status(404).send("Canción no encontrada")
    canciones[index] = cancion
    fs.writeFileSync("canciones.json", JSON.stringify(canciones, null, 4))
    res.send("Canción modificada con éxito")
})                                              
