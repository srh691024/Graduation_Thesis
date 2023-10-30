const Todo = require('../models/Todo')
const Couple = require('../models/Couple')
const asyncHandler = require('express-async-handler')

const getTodosByCouple = asyncHandler(async (req, res) => {
    const { coupleId } = req.params
    if (!coupleId) return res.status(404).json({ success: false, result: 'Can not find couple' })

    const { _id } = req.user
    //Check user connected with lover
    const couple = await Couple.findOne({ $or: [{ createdUser: _id }, { loverUserId: _id }] })
    if (!couple.loverUserId) return res.status(400).json({ success: false, result: 'At the moment, you are not connetion with your lover, so you cannot use this feature' })

    const todos = await Todo.find({ coupleId: coupleId }).populate('author', 'name')
    return res.status(200).json({
        success: todos ? true : false,
        result: todos ? todos : 'No todo found'
    })
})

const createTodo = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { coupleId } = req.params

    //Check user connected with lover
    const couple = await Couple.findOne({ $or: [{ createdUser: _id }, { loverUserId: _id }] })
    if (!couple.loverUserId) return res.status(400).json({ success: false, result: 'At the moment, you are not connetion with your lover, so you cannot use this feature' })

    let { content, type, isImportant, dueDate } = req.body
    if (!content) throw new Error('Content is required')
    if (!dueDate) dueDate = new Date()
    const todo = await Todo.create({ content, type, isImportant, author: _id, dueDate, coupleId })
    const newTodo = await Todo.findById(todo._id).populate('author', 'name')
    return res.status(200).json({
        success: newTodo ? true : false,
        result: newTodo ? newTodo : 'Can not create a new todo'
    })
})
const updateTodo = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { todoId } = req.params

    //Check user connected with lover
    const couple = await Couple.findOne({ $or: [{ createdUser: _id }, { loverUserId: _id }] })
    if (!couple.loverUserId) return res.status(400).json({ success: false, result: 'At the moment, you are not connetion with your lover, so you cannot use this feature' })

    let { content, type, isImportant, dueDate } = req.body
    if (!content) throw new Error('Content is required')
    if (!dueDate) dueDate = new Date()

    const todo = await Todo.findById(todoId).populate('author', 'name')
    todo.content = content
    todo.type = type
    todo.dueDate = dueDate
    todo.isImportant = isImportant
    await todo.save()
    return res.status(200).json({
        success: todo ? true : false,
        result: todo ? todo : 'Can not update this task'
    })
})

const checkDoneTask = asyncHandler(async (req, res) => {
    const { todoId } = req.params
    const { _id } = req.user

    //Check user connected with lover
    const couple = await Couple.findOne({ $or: [{ createdUser: _id }, { loverUserId: _id }] })
    if (!couple.loverUserId) return res.status(400).json({ success: false, result: 'At the moment, you are not connetion with your lover, so you cannot use this feature' })


    const check = await Todo.findByIdAndUpdate(todoId, { completed: true })
    return res.status(200).json({
        success: check ? true : false,
        result: check ? check : 'Can not do this action'
    })
})

const checkImportantTask = asyncHandler(async (req, res) => {
    const { todoId } = req.params
    const { _id } = req.user

    //Check user connected with lover
    const couple = await Couple.findOne({ $or: [{ createdUser: _id }, { loverUserId: _id }] })
    if (!couple.loverUserId) return res.status(400).json({ success: false, result: 'At the moment, you are not connetion with your lover, so you cannot use this feature' })

    const check = await Todo.findById(todoId);
    check.isImportant = !check.isImportant
    await check.save();
    return res.status(200).json({
        success: check ? true : false,
        result: check ? check : 'Can not do this action'
    })
})

const deleteTask = asyncHandler(async (req, res) => {
    const { todoId } = req.params
    const { _id } = req.user

    //Check user connected with lover
    const couple = await Couple.findOne({ $or: [{ createdUser: _id }, { loverUserId: _id }] })
    if (!couple.loverUserId) return res.status(400).json({ success: false, result: 'At the moment, you are not connetion with your lover, so you cannot use this feature' })

    const deleteTodo = await Todo.findByIdAndDelete(todoId)
    return res.status(200).json({
        success: deleteTodo ? true : false, result: deleteTodo ? deleteTodo : 'Can not delete this task'
    })
})




module.exports = {
    createTodo,
    getTodosByCouple,
    checkDoneTask,
    deleteTask,
    checkImportantTask,
    updateTodo
}