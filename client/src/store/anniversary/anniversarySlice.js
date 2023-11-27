import { createSlice } from "@reduxjs/toolkit";
import * as actions from '~/store/anniversary/asyncAction'

export const anniversarySlice = createSlice({
    name: 'anniversary',
    initialState: {
        anniversaries: [],
    },
    reducers: {
    },
    extraReducers: (builder) => {

        //GET ALL ANNIVERSARIES
        builder.addCase(actions.getAnniversariesByCouple.pending, (state) => {
            // Bật trạng thái loading
            state.isLoading = true;
        });
        builder.addCase(actions.getAnniversariesByCouple.fulfilled, (state, action) => {
            // Tắt trạng thái loading, lưu thông tin user vào store
            state.isLoading = false;
            state.anniversaries = action.payload;
        });
        builder.addCase(actions.getAnniversariesByCouple.rejected, (state, action) => {
            // Tắt trạng thái loading, lưu thông báo lỗi vào store
            state.isLoading = false;
            state.anniversaries = [];
        });

        //ADD NEW ANNI
        builder.addCase(actions.addAnni.pending, (state) => {
            // Bật trạng thái loading
            state.isLoading = true;
        });
        builder.addCase(actions.addAnni.fulfilled, (state, action) => {
            // Tắt trạng thái loading, lưu thông tin user vào store
            state.isLoading = false;
            state.anniversaries.push(action.payload);
        });
        builder.addCase(actions.addAnni.rejected, (state, action) => {
            // Tắt trạng thái loading, lưu thông báo lỗi vào store
            state.isLoading = false;
        });

        //UPDATE ANNI
        builder.addCase(actions.updateAnni.pending, (state) => {
            // Bật trạng thái loading
            state.isLoading = true;
        });
        builder.addCase(actions.updateAnni.fulfilled, (state, action) => {
            // Tắt trạng thái loading, lưu thông tin user vào store
            state.isLoading = false;
            const updatedAnniversary = action.payload
            const index = state.anniversaries.findIndex(anni => anni._id === updatedAnniversary._id);
            if(index !== -1){
                state.anniversaries[index] = updatedAnniversary
            }
        });
        builder.addCase(actions.updateAnni.rejected, (state, action) => {
            // Tắt trạng thái loading, lưu thông báo lỗi vào store
            state.isLoading = false;
        });


        //DELETE TASK
        builder.addCase(actions.deleteAnni.pending, (state) => {
            // Bật trạng thái loading
            state.isLoading = true;
        });
        builder.addCase(actions.deleteAnni.fulfilled, (state, action) => {
            // Tắt trạng thái loading, lưu thông tin user vào store
            state.isLoading = false;
            const anniId = action.payload._id;
            const index = state.anniversaries.findIndex(anni => anni._id === anniId);
            if (index !== -1) {
                state.anniversaries.splice(index, 1);
            }
        });
        builder.addCase(actions.deleteAnni.rejected, (state, action) => {
            // Tắt trạng thái loading, lưu thông báo lỗi vào store
            state.isLoading = false;
        });
    }
})

// eslint-disable-next-line no-empty-pattern
export const { } = anniversarySlice.actions;
export default anniversarySlice.reducer