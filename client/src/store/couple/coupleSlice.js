// import { createSlice } from "@reduxjs/toolkit";
// import * as actions from './asyncAction'

// export const coupleSlice = createSlice({
//     name: 'couple',
//     initialState: {
//         couple: null,
//         isLoading: false,
//     },
//     reducers: {

//     },
//     extraReducers: (builder) => {
//         // Bắt đầu thực hiện action login (Promise pending)
//         builder.addCase(actions.getCouple.pending, (state) => {
//             // Bật trạng thái loading
//             state.isLoading = true;
//         });

//         // Khi thực hiện action login thành công (Promise fulfilled)
//         builder.addCase(actions.getCouple.fulfilled, (state, action) => {
//             // Tắt trạng thái loading, lưu thông tin user vào store
//             state.isLoading = false;
//             state.couple = action.payload;
//         });

//         // Khi thực hiện action login thất bại (Promise rejected)
//         builder.addCase(actions.getCouple.rejected, (state, action) => {
//             // Tắt trạng thái loading, lưu thông báo lỗi vào store
//             state.isLoading = false;
//             state.current = null;
//         });
//     }
// })
// export const {  } = coupleSlice.actions;
// export default coupleSlice.reducer