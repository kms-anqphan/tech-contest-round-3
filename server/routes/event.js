// 1. crud for /api/event with in memory data structure
// event data model {id, title, message, event_start, event_end, registration_start, registration_end, item_count { item_id, item_count }, registered_users { user_id, item_id } }

const express = require('express');
const eventRouter = express.Router();
const { events } = require('../global_store');
const { v4: uuidv4 } = require('uuid');

eventRouter.get('/', (req, res) => {
	const eventList = Array.from(events.values());

	res.send(eventList);
});

eventRouter.get('/:id', (req, res) => {
	const id = req.params.id;
	const event = events.get(id);

	res.send(event);
});

eventRouter.post('/', (req, res) => {
	const event = req.body;
	events.set(uuidv4(), event);

	res.send('create event');
});

eventRouter.put('/:id', (req, res) => {
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

eventRouter.delete('/:id', (req, res) => {
	const id = req.params.id;
	events.delete(id);

	res.send('delete event');
});

module.exports = eventRouter;
