const express = require('express');
const db = require('./config/db');
const route = require('./routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config()

const { createServer } = require("http");
const { Server } = require("socket.io");


//Connect to MongoDB
db.connect();

//init express app  
const app = express();

//adding socket.io configuration

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.URL_CLIENT,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true,
    }
});

//middlewares
app.use(express.urlencoded({ extended: true }));    //giúp đọc được data gửi theo kiểu array, object 
app.use(express.json());    //giúp express đọc hiểu data mà client gửi lên kiểu json
app.use(cors({
    origin: process.env.URL_CLIENT,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
}));
app.use(cookieParser());

app.get('/', (req, res) => { res.send("Hello word") });

route(app);

const onlineUsers = {};

io.on("connection", (socket) => {
    socket.on("authenticate", (userId) => {
        if (userId) {
            // Xác thực người dùng và liên kết socket.id với userId
            onlineUsers[userId] = socket.id;
            // Gửi danh sách người dùng trực tuyến cho tất cả mọi người khi có sự thay đổi
            io.emit("online-users", Object.keys(onlineUsers));
        }
    });

    socket.on("disconnect", () => {
        // Xóa người dùng khỏi danh sách người dùng trực tuyến khi ngắt kết nối
        const userId = Object.keys(onlineUsers).find((key) => onlineUsers[key] === socket.id);
        if (userId) {
            delete onlineUsers[userId];
            // Gửi danh sách người dùng trực tuyến cho tất cả mọi người khi có sự thay đổi
            io.emit("online-users", Object.keys(onlineUsers));
        }
    });

    //COMMENT 
    socket.on('new-comment', (data) => {
        // Sau đó, phát sự kiện chỉ đến các client lắng nghe trên bài viết tương ứng
        io.emit('new-comment', { postId: data.postId, comment: data.comment });
    });

    //LIKE
    socket.on('like', (data) => {
        // Gửi thông điệp đến tất cả các client đang theo dõi post này
        io.emit('like', { postId: data.postId, like: data.like });
    });

    //NOTIFICATION
    socket.on('notifyCouple', (data) => {
        // Gửi thông điệp đến tất cả các client đang theo dõi post này
        io.emit('notifyCouple', { notiId: data.notiId, notification: data.notification });
    });
    socket.on('notifyPublic', (data) => {
        // Gửi thông điệp đến tất cả các client đang theo dõi post này
        io.emit('notifyPublic', { notiId: data.notiId, notification: data.notification });
    });
})

exports.io = io
// app.listen(process.env.PORT, () => console.log(`is OKAY on port ${process.env.PORT}`));

server.listen(process.env.PORT, () => console.log(`is OKAY on port ${process.env.PORT}`));

//pass database: XMqVqVruqRHhHGcs