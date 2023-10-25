const express = require('express');
const router = express.Router();
const todosController = require('../controllers/TodoController')
const { verifyAccessToken } = require('../middlewares/verifyToken');

router.post('/createTodo/:coupleId', verifyAccessToken, todosController.createTodo);
router.get('/getTodosByCouple/:coupleId', verifyAccessToken, todosController.getTodosByCouple);
router.patch('/checkDoneTask/:todoId', verifyAccessToken, todosController.checkDoneTask);


module.exports = router