const router = require("express").Router()
const {create, 
				readAll, 
				update,
				del,
				read} = require("../models/schema")


router.get("/", (req, res, next) => {
				if(req.query.id != undefined) {
								read(req.query.id)
												.then(data => {
																return res.json(data)
												})
												.catch(err => {
																return res.status(500).json({error: err})
												})
				} else {

								readAll()
												.then(data => {
																return res.json(data)
												})
												.catch(err => {
																return res.status(500).json({error: err})
												})
				}
})

router.post("/", (req, res, next) => {
				create(req.body)
								.then(data => {
												return res.status(201).json(data)
								})
								.catch(err => {
												return res.status(500).json({error: err})

								})
})

router.put("/", (req, res, next) => {
				update(req.query.id, req.query.desc)
								.then(data => {
												return res.json(data)
								})
								.catch(err => {
												return res.status(500).json({error: err})
								})
})

router.delete("/", (req, res, next) => {
				del(req.query.id)
								.then(data => {
												return res.json(data)
								})
								.catch(err => {
												return res.status(500).json({error: err})
								})
})

module.exports = router
