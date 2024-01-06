// 1. crud for /api/event with in memory data structure
// event data model {id, title, message, event_start, event_end, registration_start, registration_end, item_count { item_id, item_count }, registered_users { user_id, item_id, item_option, is_served } }

const express = require('express');
const eventRouter = express.Router();
const { events } = require('../global_store');
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
	const event = req.body;
	const id = uuidv4();
	events.set(id, { ...event, id });

	res.send('create event');
});

eventRouter.put('/:id', authenticate, (req, res) => {
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
	foundEvent.registered_users.push({userId: user.id, itemId: user.itemId, itemOption: user.itemOption, isServed: false});
	events.set(id, foundEvent);

	res.send('register user');
});

eventRouter.post('/:id/serve', (req, res) => {
	const id = req.params.id;
	const user = req.body;
	// register user
	const foundEvent = events.get(id);
	foundEvent.registered_users.find(u => u.userId === user.id).isServed = true;
	events.set(id, foundEvent);

	res.send('serve user');
});

module.exports = eventRouter;
