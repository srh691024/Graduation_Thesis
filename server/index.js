const express = require('express');
const db = require('./config/db');
const route = require('./routes');
const cors = require('cors');


//Connect to MongoDB
db.connect();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send("Hello, world!"));


route(app);
const PORT = 3000; //Cho ra file env sau
app.listen(PORT, () => console.log(`is OKAY on port ${PORT}`));

//pass database: XMqVqVruqRHhHGcs