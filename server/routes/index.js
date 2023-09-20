const authsRouter = require('./auths');
const {notFound, errHandler} = require('../middlewares/errHandler');

function route(app) {
    //route - đường dẫn truy cập trang trên trình duyệt
    app.use('/api/auth', authsRouter);


    app.use(notFound)
    app.use(errHandler)
}

module.exports = route;
