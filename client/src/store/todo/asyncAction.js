import { createAsyncThunk } from "@reduxjs/toolkit";
import * as todoServices from '~/services/todoServices';

export const getTodosByCouple = createAsyncThunk('todo/getTodosByCouple', async (coupleId, { rejectWithValue }) => {
    const response = await todoServices.apiGetTodosByCouple(coupleId);
    if (!response.success) return rejectWithValue(response)
    return response.result
})

export const addTodo = createAsyncThunk('todo/addTodo', async ({ coupleId, values }, { rejectWithValue }) => {
    const response = await todoServices.apiCreateTodo(coupleId, values)
    if (!response.success) return rejectWithValue(response)
    return response.result
})

export const checkDone = createAsyncThunk('todo/checkDone', async (todoId , { rejectWithValue }) => {
    const response = await todoServices.apiCreateTodo(todoId)
    if (!response.success) return rejectWithValue(response)
    return response.result
})