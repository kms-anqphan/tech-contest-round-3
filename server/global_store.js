const bcrypt = require('bcrypt');

let salt = bcrypt.genSaltSync(10);

const events = new Map();
events.set('1', {
	id: '1',
	title: 'event 1',
	description: 'game on!',
	eventStart: new Date(),
	eventEnd: new Date(),
	registrationStart: new Date(),
	registrationEnd: new Date(),
	items: [
		{
			item: '1',
			count: 10,
		}
	],
});

const users = new Map();
users.set('1', {
	id: '1',
	email: 'admin@appyours.com',
	password: bcrypt.hashSync('12345', salt),
	creditScore: 70,
	role: 'admin',
});
users.set('2', {
	id: '2',
	email: 'user1@appyours.com',
	password: bcrypt.hashSync('12345', salt),
	creditScore: 70,
	role: 'user',
});
users.set('2', {
	id: '3',
	email: 'user2@appyours.com',
	password: bcrypt.hashSync('12345', salt),
	creditScore: 70,
	role: 'user',
});
users.set('2', {
	id: '4',
	email: 'user3@appyours.com',
	password: bcrypt.hashSync('12345', salt),
	creditScore: 70,
	role: 'user',
});

const items = new Map();
items.set('1', {
	id: '1',
	description: 'item 1',
	imageUrl: 'https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg',
	options: [
		"a",
		"b"
	],
});

module.exports = {
	events,
	users,
	items,
};