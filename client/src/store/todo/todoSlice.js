import { createSlice } from "@reduxjs/toolkit";
import * as actions from '~/store/todo/asyncAction'

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: [],
    },
    reducers: {
    },
    extraReducers: (builder) => {

        //get all todo list
        builder.addCase(actions.getTodosByCouple.pending, (state) => {
            // Bật trạng thái loading
            state.isLoading = true;
        });
        builder.addCase(actions.getTodosByCouple.fulfilled, (state, action) => {
            // Tắt trạng thái loading, lưu thông tin user vào store
            state.isLoading = false;
            state.todos = action.payload;
        });
        builder.addCase(actions.getTodosByCouple.rejected, (state, action) => {
            // Tắt trạng thái loading, lưu thông báo lỗi vào store
            state.isLoading = false;
            state.todos = [];
        });

        //add new task
        builder.addCase(actions.addTodo.pending, (state) => {
            // Bật trạng thái loading
            state.isLoading = true;
        });
        builder.addCase(actions.addTodo.fulfilled, (state, action) => {
            // Tắt trạng thái loading, lưu thông tin user vào store
            state.isLoading = false;
            state.todos.push(action.payload);
        });
        builder.addCase(actions.addTodo.rejected, (state, action) => {
            // Tắt trạng thái loading, lưu thông báo lỗi vào store
            state.isLoading = false;
        });

        //check done task
        builder.addCase(actions.checkDone.pending, (state) => {
            // Bật trạng thái loading
            state.isLoading = true;
        });
        builder.addCase(actions.checkDone.fulfilled, (state, action) => {
            // Tắt trạng thái loading, lưu thông tin user vào store
            state.isLoading = false;
            // state.todos.map((t)=> {
            //     if (t._id === action.payload._id) {
            //         t.completed = action.payload.completed
            //     }
            // })
            const index = state.todos.findIndex(t => t._id === action.payload._id)
            state.todos[index].completed = action.payload.completed
        });
        builder.addCase(actions.checkDone.rejected, (state, action) => {
            // Tắt trạng thái loading, lưu thông báo lỗi vào store
            state.isLoading = false;
        });
    }
})

export const { } = todoSlice.actions;
export default todoSlice.reducer
