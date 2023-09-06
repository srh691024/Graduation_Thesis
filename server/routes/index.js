const authsRouter = require('./auths');

function route(app) {
    //route - đường dẫn truy cập trang trên trình duyệt
    app.use('/auth', authsRouter);

}

module.exports = route;
