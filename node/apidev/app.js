const express = require("express")
const bp = require("body-parser")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express()

dotenv.config()
app.use(bp.json())

mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}) 
.then(conn => {
	console.log("Connected to MongoDB")
})
.catch(err => {
	console.error(err)
})

app.use("/", require("./routes/test"))
// crud routes
app.use("/api/v1", require("./routes/crud"))

app.listen(3000, () => {
	console.log("Listening....")
})
