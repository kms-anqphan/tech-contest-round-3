// write a barebone express server that listens on port 3000
// endpoint
// 1. crud for /api/event with in memory data structure
// event data model {id, title, message, event_start, event_end, registration_start, registration_end, item_count { item_id, item_count }, registered_users { user_id, item_id } }
// 2. crud for /api/item with in memory data structure
// item data model { id, description, image, options }
// 3. crud for /api/user with in memory data structure and login
// user data model { id, email, password }

const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cors = require('cors');

const eventRouter = require('./routes/event');
const itemRouter = require('./routes/item');
const userRouter = require('./routes/user');

app.use(cors());
app.use(bodyParser.json());
app.use('/api/event', eventRouter);
app.use('/api/item', itemRouter);
app.use('/api/user', userRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));