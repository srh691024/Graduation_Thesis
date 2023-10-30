import { createAsyncThunk } from "@reduxjs/toolkit";
import * as userServices from '~/services/userServices';

export const getCurrentUser = createAsyncThunk('user/getCurrentUser', async (_, { rejectWithValue }) => {
    const response = await userServices.apiGetCurrent()
    if (!response.success) return rejectWithValue(response);
    return response.result
})

export const updateUser = createAsyncThunk('user/updateUser', async (formData, { rejectWithValue }) => {
    const response = await userServices.apiUpdateUser(formData)
    console.log(response)
    if (!response.success) return rejectWithValue(response);
    return response.updatedUser
})