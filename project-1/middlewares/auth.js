const jwt = require("jsonwebtoken");

const verifyMW = (req ,res, next) => {
	const authtoken = req.get("Authorization");

	jwt.verify(authtoken, process.env.JWT_SECRET, (err, decodedData) => {
		if(err) {
			return res.status(401).json({message: "Unauthorized"})
		}
		req.decodedData = decodedData;
		next();
	})
}

module.exports = verifyMW;
