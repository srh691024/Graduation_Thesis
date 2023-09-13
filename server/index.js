const express = require('express');
const db = require('./config/db');
const route = require('./routes');
const cors = require('cors');
require('dotenv').config()


//Connect to MongoDB
db.connect();

//init express app  
const app = express();

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

route(app);
app.listen(process.env.PORT, () => console.log(`is OKAY on port ${process.env.PORT}`));

//pass database: XMqVqVruqRHhHGcs