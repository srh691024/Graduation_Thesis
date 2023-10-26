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

export const apiCheckImportantTask = (todoId) => axios({
    url: `todo/checkImportantTask/${todoId}`,
    method: 'PATCH'
})

export const apiDeleteTask = (todoId) => axios({
    url: `todo/deleteTask/${todoId}`,
    method: 'DELETE'
})

export const apiUpdateTodo = (todoId, data) => axios({
    url: `todo/updateTodo/${todoId}`,
    method: 'PUT',
    data
})