import { createSlice } from "@reduxjs/toolkit";
import * as actions from '~/store/todo/asyncAction'

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: [],
        isLoading: false,
    },
    reducers: {
    },
    extraReducers: (builder) => {

        //GET ALL TODOLIST
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

        //ADD NEW TASK
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

        //UPDATE TASK
        builder.addCase(actions.updateTask.pending, (state) => {
            // Bật trạng thái loading
            state.isLoading = true;
        });
        builder.addCase(actions.updateTask.fulfilled, (state, action) => {
            // Tắt trạng thái loading, lưu thông tin user vào store
            state.isLoading = false;
            const updatedTodo = action.payload
            const index = state.todos.findIndex(todo => todo._id === updatedTodo._id);
            if(index !== -1){
                state.todos[index] = updatedTodo
            }
        });
        builder.addCase(actions.updateTask.rejected, (state, action) => {
            // Tắt trạng thái loading, lưu thông báo lỗi vào store
            state.isLoading = false;
        });

        //CHECK DONE TASK
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
            const { _id } = action.payload;
            const todoToMarkCompleted = state.todos.find(todo => todo._id === _id);
            if (todoToMarkCompleted) {
                todoToMarkCompleted.completed = true;
            }
        });
        builder.addCase(actions.checkDone.rejected, (state, action) => {
            // Tắt trạng thái loading, lưu thông báo lỗi vào store
            state.isLoading = false;
        });

        //CHECK IMPORTANT TASK
        builder.addCase(actions.checkImportant.pending, (state) => {
            // Bật trạng thái loading
            state.isLoading = true;
        });
        builder.addCase(actions.checkImportant.fulfilled, (state, action) => {
            // Tắt trạng thái loading, lưu thông tin user vào store
            state.isLoading = false;
            const { _id } = action.payload;
            const todoimportant = state.todos.find(todo => todo._id === _id);
            if (todoimportant) {
                todoimportant.isImportant = action.payload.isImportant;
            }
        });
        builder.addCase(actions.checkImportant.rejected, (state, action) => {
            // Tắt trạng thái loading, lưu thông báo lỗi vào store
            state.isLoading = false;
        });


        //DELETE TASK
        builder.addCase(actions.deleteTask.pending, (state) => {
            // Bật trạng thái loading
            state.isLoading = true;
        });
        builder.addCase(actions.deleteTask.fulfilled, (state, action) => {
            // Tắt trạng thái loading, lưu thông tin user vào store
            state.isLoading = false;
            const todoId = action.payload._id;
            const index = state.todos.findIndex(todo => todo._id === todoId);
            if (index !== -1) {
                state.todos.splice(index, 1);
            }
        });
        builder.addCase(actions.deleteTask.rejected, (state, action) => {
            // Tắt trạng thái loading, lưu thông báo lỗi vào store
            state.isLoading = false;
        });
    }
})

// eslint-disable-next-line no-empty-pattern
export const { } = todoSlice.actions;
export default todoSlice.reducer
