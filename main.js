import express from 'express';
import { arg } from "./generator.js"
const app = express();

app.get("/books", (req, res) => {
    const books = [
        { title: "clean code" },
        { title: "clean code 2" },
        { title: "clean code 3" },
        { title: "clean code 4" },
    ]

    res.status(200).json(arg())

})

app.listen(3000, () => {
    console.log("Escutando na porta 3000")
})