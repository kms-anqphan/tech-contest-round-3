// 2. crud for /api/item with in memory data structure
// item data model { id, description, image, options }

const express = require('express');
const itemRouter = express.Router();
const { items } = require('../global_store');
const { v4: uuidv4 } = require('uuid');

itemRouter.get('/', (req, res) => {
	const itemList = Array.from(items.values());

	res.send(itemList);
});

itemRouter.get('/:id', (req, res) => {
	const id = req.params.id;
	const item = items.get(id);

	res.send(item);
});

itemRouter.post('/', (req, res) => {
	const item = req.body;
	items.set(uuidv4(), item);

	res.send('create item');
});

itemRouter.put('/:id', (req, res) => {
	const item = req.body;
	const id = req.params.id;
	// update item
	const foundItem = items.get(id);
	foundItem = {
		foundItem,
		...item,
	}
	items.set(id, foundItem);

	res.send('update item');
});

itemRouter.delete('/:id', (req, res) => {
	const id = req.params.id;
	items.delete(id);

	res.send('delete item');
});

module.exports = itemRouter;