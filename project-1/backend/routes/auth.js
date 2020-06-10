const router = require("express").Router();
const {
	findByEmail,
	create
} = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyMW = require("../middlewares/auth");

router.post("/signup", (req, res, next) => {
	let {
		username,
		password,
		email
	} = req.body;

	findByEmail(email)
	.then(user => {
		if(user) {
			res.status(400)
			res.json({message: "user already exists"})
			return
		} 

		password = bcrypt.hashSync(password, parseInt(process.env.SALT));
		create(username, email, password)
		.then(user => {
			jwt.sign({id: user._id}, process.env.JWT_SECRET, (err, token) => {
				if(err) {
					next(err);
					return
				}
				res.status(201)
				res.json({uid: user._id, token: token, displayName: user.username, photoURL: "https://picsum.photos/200"})
			})
		}).catch(next)
	})
	.catch(next)
})





router.post("/login", (req, res, next) => {
	let {
		email,
		password
	} = req.body;
	findByEmail(email)
	.then(user => {
		if(!user) {
			res.status(404)
			res.json({message: "user not found"})
			return
		}
		if(bcrypt.compareSync(password, user.password)) {
			jwt.sign({id: user._id}, process.env.JWT_SECRET, (err, token) => {
				if(err) {
					return next(err)
				}
				res.json({uid: user._id, token: token, displayName: user.username, photoURL: "https://picsum.photos/200"})
			})
		} else {
			res.status(401)
			res.json({message: "Wrong password"})
		}
	}).catch(next)
})

router.get("/testauth", verifyMW, (req, res, next) => {
	return res.json(req.decodedData);
})

module.exports = router;
