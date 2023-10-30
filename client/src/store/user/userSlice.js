import { createSlice } from "@reduxjs/toolkit";
import * as actions from '~/store/user/asyncAction'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        current: {},
        token: null,
        isLoading: false,
        mes: '',
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
            state.token = action.payload.token
            state.current = action.payload.userData
        },
        logout: (state, action) => {
            state.isLoggedIn = false
            state.token = null
        },
        clearMessage: (state) => {
            state.mes = ''
        },
    },
    extraReducers: (builder) => {
        // Bắt đầu thực hiện action login (Promise pending)
        builder.addCase(actions.getCurrentUser.pending, (state) => {
            // Bật trạng thái loading
            state.isLoading = true;
        });

        // Khi thực hiện action login thành công (Promise fulfilled)
        builder.addCase(actions.getCurrentUser.fulfilled, (state, action) => {
            // Tắt trạng thái loading, lưu thông tin user vào store
            state.isLoading = false;
            state.current = action.payload;
            state.isLoggedIn = true;
        });

        // Khi thực hiện action login thất bại (Promise rejected)
        builder.addCase(actions.getCurrentUser.rejected, (state, action) => {
            // Tắt trạng thái loading, lưu thông báo lỗi vào store
            state.isLoading = false;
            state.current = null;
            state.isLoggedIn = false;
            state.token = null;
            state.mes = 'Your login session has expired. Please log in again!'    
        });


        //UPDATE USER

        builder.addCase(actions.updateUser.pending, (state) => {
            // Bật trạng thái loading
            state.isLoading = true;
        });

        // Khi thực hiện action login thành công (Promise fulfilled)
        builder.addCase(actions.updateUser.fulfilled, (state, action) => {
            // Tắt trạng thái loading, lưu thông tin user vào store
            state.isLoading = false;
            state.current = action.payload;
            console.log(state.current);
            console.log(action.payload);
        });

        // Khi thực hiện action login thất bại (Promise rejected)
        builder.addCase(actions.updateUser.rejected, (state, action) => {
            // Tắt trạng thái loading, lưu thông báo lỗi vào store
            state.isLoading = false;
        });
    }
})

export const { login, logout, clearMessage } = userSlice.actions;
export default userSlice.reducer
