// 3. crud for /api/user with in memory data structure and login
// user data model { id, email, password }

const express = require('express');
const userRouter = express.Router();
const { users } = require('../global_store');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const authenticate = require('../middleware/auth');

userRouter.get('/', (req, res) => {
	const userList = Array.from(users.values());

	res.send(userList);
});

userRouter.get('/:id', (req, res) => {
	const id = req.params.id;
	const user = users.get(id);

	res.send(user);
});

userRouter.post('/', (req, res) => {
	const user = req.body;
	// hash and salt password
	let salt = bcrypt.genSaltSync(10);
	let hash = bcrypt.hashSync(user.password, salt);
	let id = uuidv4();

	users.set(id, { ...user, password: hash, id });

	res.send('create user');
});

userRouter.put('/', authenticate, (req, res) => {
	const user = req.body;
	const id = req.user.id;
	// update user
	const foundUser = users.get(id);
	foundUser = {
		foundUser,
		...user,
	}
	users.set(id, foundUser);

	res.send('update user');
});

userRouter.delete('/:id', (req, res) => {
	const id = req.params.id;
	users.delete(id);

	res.send('delete user');
});

userRouter.post('/login', (req, res) => {
	const user = req.body;
	// check if user exists
	const foundUser = Array.from(users.values()).find(u => u.email === user.email);
	if (!foundUser) {
		res.status(401).send('user not found');
		return;
	}
	// check if password matches
	if (!bcrypt.compareSync(user.password, foundUser.password)) {
		res.status(401).send('password incorrect');
		return;
	}

	// generate token
	const token = uuidv4();
	foundUser.token = token;
	users.set(foundUser.id, foundUser);

	res.send({ token });
});

userRouter.post('/logout', authenticate, (req, res) => {
	const user = req.body;
	// check if user exists
	const foundUser = Array.from(users.values()).find(u => u.email === user.email);
	if (!foundUser) {
		res.status(401).send('user not found');
		return;
	}
	// check if token matches
	if (foundUser.token !== user.token) {
		res.status(401).send('token incorrect');
		return;
	}

	// generate token
	foundUser.token = '';
	users.set(foundUser.id, foundUser);

	res.send('logout');
});

module.exports = userRouter;