// 3. crud for /api/user with in memory data structure and login
// user data model { id, email, password }

const express = require('express');
const userRouter = express.Router();
const { users } = require('../global_store');
const { v4: uuidv4 } = require('uuid');

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
	users.set(uuidv4(), user);

	res.send('create user');
});

userRouter.put('/:id', (req, res) => {
	const user = req.body;
	const id = req.params.id;
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

module.exports = userRouter;