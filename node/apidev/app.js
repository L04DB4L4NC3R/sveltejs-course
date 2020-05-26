const express = require("express")
const bp = require("body-parser")

const app = express()
app.use(bp.json())

app.use("/", require("./routes/test"))
app.listen(3000, () => {
				console.log("Listening....")
})
