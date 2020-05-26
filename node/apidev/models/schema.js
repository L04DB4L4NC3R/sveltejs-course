const mongoose = require("mongoose")

const quoteSchema = new mongoose.Schema({
				description: {
								type: String,
								default: "NONE"
				},
				time_of_creation: {
								type: Date,
								default: new Date()
				},
})

const quotemodel = mongoose.model("quote", quoteSchema)

module.exports.create = (obj) => {
				return quotemodel.create(obj)
}
module.exports.read = (id) => {
				return quotemodel.findById(id)
}
module.exports.readAll = () => {
				return quotemodel.find({}, {description: 1})
}
module.exports.update = (id, desc) => {
				return quotemodel.findOneAndUpdate({_id: id}, {description: desc})
}
module.exports.del = (id) => {
				return quotemodel.findOneAndDelete({_id: id})
}
