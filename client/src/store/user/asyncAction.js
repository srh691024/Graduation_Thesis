import { createAsyncThunk } from "@reduxjs/toolkit";
import * as userServices from '~/services/userServices';

export const getCurrentUser = createAsyncThunk('user/getCurrentUser', async (_, { rejectWithValue }) => {
    const response = await userServices.apiGetCurrent()
    if (!response.success) return rejectWithValue(response);
    return response.result
})