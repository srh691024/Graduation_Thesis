import axios from '../utils/httpRequest'

export const apiCreateTodo = (coupleId, data) => axios({
    url: `todo/createTodo/${coupleId}`,
    method: 'POST',
    data
})
export const apiGetTodosByCouple = (coupleId) => axios({
    url: `todo/getTodosByCouple/${coupleId}`,
    method: 'GET'
})

export const apiCheckDoneTask = (todoId) => axios({
    url: `todo/checkDoneTask/${todoId}`,
    method: 'PATCH'
})