const express = require("express")
const bp = require("body-parser")

const app = express()
app.use(bp.json())

app.get("/", (req, res, next) => {
				return res.status(201).json({message: "Working"})
})

app.post("/", (req, res, next) => {
				return res.json(req.body)
})

app.listen(3000, () => {
				console.log("Listening....")
})
