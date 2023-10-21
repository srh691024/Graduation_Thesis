const authsRouter = require('./auths');
const couplesRouter = require('./couples');
const {notFound, errHandler} = require('../middlewares/errHandler');

function route(app) {
    //route - đường dẫn truy cập trang trên trình duyệt
    app.use('/api/auth', authsRouter);
    app.use('/api/couple', couplesRouter);

    app.use(notFound)
    app.use(errHandler)
}

module.exports = route;
