const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
})

const userModel = mongoose.model("user", userSchema);


module.exports.create = (username, email, password) => {
	return userModel.create({
		username,
		email,
		password
	});
}

module.exports.findByEmail = (email) => {
	return userModel.findOne({email});
}
