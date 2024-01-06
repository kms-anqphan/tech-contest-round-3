const bcrypt = require('bcrypt');

let salt = bcrypt.genSaltSync(10);

const events = new Map();
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

module.exports = {
	events,
	users,
	items,
};