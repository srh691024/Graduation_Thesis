// import { createAsyncThunk } from "@reduxjs/toolkit";
// import * as coupleServices from '~/services/coupleServices'

// export const getCouple = createAsyncThunk('couple/getCouple', async(data, {rejectWithValue})=>{
//     const response = await coupleServices.getCouple()
//     console.log(response)
//     if(!response.success) return rejectWithValue(response)
//     return response.result
// })