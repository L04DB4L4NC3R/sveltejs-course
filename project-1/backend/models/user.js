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
	},
	todos: {
		type: [
			{
				created: {
					type: Date,
					default: new Date()
				},
				done: {
					type: Boolean,
					default: false
				},
				text: String
			}
		],
		default: []
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


module.exports.createTODO = (id, text) => {
	return userModel.findOneAndUpdate({_id: id}, 
		{
			"$push": {
				todos: {
					text
				}
			}
		})
}

module.exports.readTODOs = (id) => {
	return userModel.findOne({_id: id}, {
		_id: 0,
		todos: 1
	})
}

module.exports.delTODO = (user_id, todo_id) => {
	return userModel.findOneAndUpdate({_id: user_id}, {
		"$pull": {
			todos: {
				_id: todo_id
			}
		}
	})
}

module.exports.updateTODO = (user_id, todo_id, is_done) => {
	return userModel.findOneAndUpdate({
		_id: user_id,
		"todos": {
			"$elemMatch": {
				_id: todo_id
			}
		}
	}, {
		"$set": {
			"todos.$.done": is_done
		}
	})
}

