const router = require("express").Router()
let myMW = (req, res, next) => {
				console.log("I got a request")
				console.table(req.body)
				return res.status(403).json({message: "you are forbidden"})
				// next()
}
router.get("/", (req, res, next) => {
				return res.status(201).json({message: "Working"})
})

router.post("/", myMW, (req, res, next) => {
				return res.json(req.body)
})

module.exports = router
