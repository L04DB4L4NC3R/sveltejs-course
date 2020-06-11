const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/graphql-schema");
require("dotenv").config()

//mongodb
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
});
mongoose.connection
.once('open',()=>console.log("Connected to mongodb"))
.on("error",console.log);

const app = express();

app.use("/graphql",graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(3000,()=>console.log("Listening on port 3000"));
