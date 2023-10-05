const express = require('express');
const db = require('./config/db');
const route = require('./routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config()


//Connect to MongoDB
db.connect();

//init express app  
const app = express();

//middlewares
app.use(express.urlencoded({ extended: true }));    //giúp đọc được data gửi theo kiểu array, object 
app.use(express.json());    //giúp express đọc hiểu data mà client gửi lên kiểu json
app.use(cors({
    origin: process.env.URL_CLIENT,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(cookieParser());

app.get('/', (req, res) => { res.send("Hello word") });

route(app);
app.listen(process.env.PORT, () => console.log(`is OKAY on port ${process.env.PORT}`));

//pass database: XMqVqVruqRHhHGcs