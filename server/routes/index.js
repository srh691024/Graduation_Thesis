const authsRouter = require('./auths');
const couplesRouter = require('./couples');
const postsRouter = require('./posts');
const todosRouter = require('./todos');
const { notFound, errHandler } = require('../middlewares/errHandler');

function route(app) {
    //route - đường dẫn truy cập trang trên trình duyệt
    app.use('/api/auth', authsRouter);
    app.use('/api/couple', couplesRouter);
    app.use('/api/post', postsRouter);
    app.use('/api/todo', todosRouter);
    app.use(notFound)
    app.use(errHandler)
}

module.exports = route;
