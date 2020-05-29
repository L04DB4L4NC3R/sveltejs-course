const express = require("express");
const bp = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

app.use(bp.json());

app.get("/ping", (req, res, next) => {
	res.json({message: "pong"})
})

app.use("/api/v1", require("./routes/auth"));

app.use((err, req, res, next) => {
	res.status(500)
	console.error(err.stack)
	return res.json({error: err.message})
})

mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => {
	console.log("Connected to the DB");
}).catch(err => {
	console.error(err);
})
app.listen(process.env.PORT || 3000, () => {
	console.log("Listening...")
})
