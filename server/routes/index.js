const authsRouter = require('./auths');
const couplesRouter = require('./couples');
const postsRouter = require('./posts');
const todosRouter = require('./todos');
const notifiesRouter = require('./notifies');
const anniversariesRouter = require('./anniversaries');
const adminsRouter = require('./admins');
const { notFound, errHandler } = require('../middlewares/errHandler');

function route(app) {
    //route - đường dẫn truy cập trang trên trình duyệt
    app.use('/api/auth', authsRouter);
    app.use('/api/couple', couplesRouter);
    app.use('/api/post', postsRouter);
    app.use('/api/todo', todosRouter);
    app.use('/api/anniversary', anniversariesRouter);
    app.use('/api/notify', notifiesRouter);
    app.use('/api/admin', adminsRouter);
    app.use(notFound)
    app.use(errHandler)
}

module.exports = route;
