const express = require("express");
const bp = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(bp.json());
app.use(cors());

app.get("/ping", (req, res, next) => {
	res.json({message: "pong"})
})

app.use("/api/v1", require("./routes/auth"));
app.use("/api/v1/todo", require("./routes/todo"));

app.use((err, req, res, next) => {
	res.status(500)
	console.error(err.stack)
	return res.json({error: err.message})
})

mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
}).then(() => {
	console.log("Connected to the DB");
}).catch(err => {
	console.error(err);
})
app.listen(process.env.PORT || 3000, () => {
	console.log("Listening...")
})
