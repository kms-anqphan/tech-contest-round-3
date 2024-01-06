// 1. crud for /api/event with in memory data structure
// event data model {id, title, message, event_start, event_end, registration_start, registration_end, item_count { item_id, item_count }, registered_users { user_id, item_id, item_option, is_served } }

const express = require('express');
const eventRouter = express.Router();
const { events, users } = require('../global_store');
const { v4: uuidv4 } = require('uuid');
const authenticate = require('../middleware/auth');

eventRouter.get('/', authenticate, (req, res) => {
	const eventList = Array.from(events.values());

	res.send(eventList);
});

eventRouter.get('/:id', (req, res) => {
	const id = req.params.id;
	const event = events.get(id);

	res.send(event);
});

eventRouter.post('/', authenticate, (req, res) => {
	if (req.user.role !== 'admin') {
		res.status(401).send('user not admin');
		return;
	}
	const event = req.body;
	const id = uuidv4();
	events.set(id, { ...event, id });

	res.send('create event');
});

eventRouter.put('/:id', authenticate, (req, res) => {
	if (req.user.role !== 'admin') {
		res.status(401).send('user not admin');
		return;
	}
	const event = req.body;
	const id = req.params.id;
	// update event
	const foundEvent = events.get(id);
	foundEvent = {
		foundEvent,
		...event,
	}
	events.set(id, foundEvent);

	res.send('update event');
});

eventRouter.delete('/:id', authenticate, (req, res) => {
	const id = req.params.id;
	events.delete(id);

	res.send('delete event');
});

eventRouter.post('/:id/register', authenticate, (req, res) => {
	const id = req.params.id;
	const user = req.body;
	// register user
	const foundEvent = events.get(id);
	foundEvent.registered_users.push({userId: user.id, itemId: user.itemId, itemOption: user.itemOption, isServed: false, creditScore: user.creditScore});

	// group registered users by itemId and sort them by creditScore
	const registeredUsers = foundEvent.registered_users;
	const sortedRegisteredUsers = registeredUsers.sort((a, b) => a.creditScore - b.creditScore);
	const groupedRegisteredUsers = sortedRegisteredUsers.reduce((acc, cur) => {
		acc[cur.itemId] = acc[cur.itemId] || [];
		acc[cur.itemId].push(cur);
		return acc;
	}, {});

	// prune grouped registered users by item count
	for (const [itemId, users] of Object.entries(groupedRegisteredUsers)) {
		const itemCount = foundEvent.item_count.find(i => i.itemId === itemId).itemCount;
		groupedRegisteredUsers[itemId] = users.slice(0, itemCount);
	}

	// find if newly registered user is not in any of the grouped registered users
	const newlyRegisteredUser = groupedRegisteredUsers[user.itemId].find(u => u.userId === user.id);
	if (!newlyRegisteredUser) {
		res.status(401).send('item count exceeded');
		return;
	}

	events.set(id, foundEvent);

	res.send('register user');
});

eventRouter.post('/:id/serve', authenticate, (req, res) => {

	const id = req.params.id;
	const user = req.body;
	// register user
	const foundEvent = events.get(id);
	foundEvent.registered_users.find(u => u.userId === user.id).isServed = true;
	events.set(id, foundEvent);

	// update user credit score
	const foundUser = users.get(user.id);
	foundUser.creditScore += 0.3;
	users.set(user.id, foundUser);

	res.send('serve user');
});

eventRouter.post('/:id/unserved', authenticate, (req, res) => {
	if (req.user.role !== 'admin') {
		res.status(401).send('user not admin');
		return;
	}
	// check if any user of the event has not been served, deduct credit score
	const id = req.params.id;
	const foundEvent = events.get(id);
	const unservedUsers = foundEvent.registered_users.filter(u => !u.isServed);
	unservedUsers.forEach(u => {
		const foundUser = users.get(u.userId);
		foundUser.creditScore -= 5;
		users.set(u.userId, foundUser);
	});
	
	res.send('unserved users');
});

module.exports = eventRouter;
