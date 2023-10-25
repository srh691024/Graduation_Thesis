import { createAsyncThunk } from "@reduxjs/toolkit";
import * as coupleServices from '~/services/coupleServices'

export const getCurrentCouple = createAsyncThunk('couple/getCurrentCouple', async(_, {rejectWithValue})=>{
    const response = await coupleServices.apiGetCoupleByCurrentUser()
    if(!response.success) return rejectWithValue(response)
    return response.result
})