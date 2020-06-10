const router = require("express").Router();
const verifyMW = require("../middlewares/auth");

const {
	createTODO,
	readTODOs,
	updateTODO,
	delTODO,
	updateTODOText
} = require("../models/user")

router.post("/", verifyMW, (req, res, next) => {
	let {
		text
	} = req.body;

	createTODO(req.decodedData.id, text)
	.then(data => {
		res.status(201).json(data)
	})
	.catch(next)
})

router.get("/", verifyMW, (req, res, next) => {
	readTODOs(req.decodedData.id)
	.then(data => {
		res.json(data)
	}).catch(next)
})

router.put("/", verifyMW, (req, res, next) => {
	let {
		is_done
	} = req.body;

	if(is_done !== false && is_done !== true) {
		return res.status(400).json({message: "is_done only accepts false or true boolean"})
	}
	const todo_id = req.query.id;

	updateTODO(req.decodedData.id, todo_id, is_done)
	.then(data => {
		res.json(data)
	}).catch(next)
})

router.delete("/", verifyMW, (req, res, next) => {
	const todo_id = req.query.id;
	delTODO(req.decodedData.id, todo_id)
	.then(data => {
		res.json(data)
	}).catch(next)
})



router.put("/updatetext", verifyMW, (req, res, next) => {
	let {
		text
	} = req.body;

	const todo_id = req.query.id;

	updateTODOText(req.decodedData.id, todo_id, text)
	.then(data => {
		res.json(data)
	}).catch(next)
})
module.exports = router;
