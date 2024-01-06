// authenticate middleware by bearer token

// Path: server/middleware/auth.js

const { users }  = require('../global_store');

const authenticate = (req, res, next) => {
	const token = req.header('Authorization').replace('Bearer ', '');
	const foundUser = Array.from(users.values()).find(u => u.token === token);
	if (!foundUser) {
		res.status(401).send('user not found');
		return;
	}

	req.user = foundUser;
	next();
}

module.exports = authenticate;