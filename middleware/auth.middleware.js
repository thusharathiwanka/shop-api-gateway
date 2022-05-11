const jwt = require("jsonwebtoken");

/**
 * use to authorize as user
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {Object} res
 */
const verifyAuth = (req, res, next) => {
	if (req.headers?.authorization) {
		try {
			const token = req.headers.authorization;

			const verified = jwt.verify(token, process.env.APP_SECRET);

			if (!verified.user) return res.status(401).json({ message: "Unauthorized" });

			req.body.userId = verified.user;
			next();
		} catch (err) {
			return res.status(401).json({ message: "Unauthorized" });
		}
	} else next();
};

module.exports = { verifyAuth };
