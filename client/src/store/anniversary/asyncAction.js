import { createAsyncThunk } from "@reduxjs/toolkit";
import * as anniversaryServices from '~/services/anniversaryServices';

export const addAnni = createAsyncThunk('anniversary/addAnni', async ({ coupleId, values }, { rejectWithValue }) => {
    const response = await anniversaryServices.apiCreateAnniversary(coupleId, values)
    if (!response.success) return rejectWithValue(response)
    return response.result
})

export const updateAnni = createAsyncThunk('anniversary/updateAnni', async ({ updateAnniId, data }, { rejectWithValue }) => {
    const response = await anniversaryServices.apiUpdateEvent(updateAnniId, data)
    if (!response.success) return rejectWithValue(response)
    return response.result
})

export const deleteAnni = createAsyncThunk('anniversary/deleteAnni', async (idAnni, { rejectWithValue }) => {
    const response = await anniversaryServices.apiDeleteEvent(idAnni)
    if (!response.success) return rejectWithValue(response)
    return response.result
})

export const getAnniversariesByCouple = createAsyncThunk('anniversary/getAnniversariesByCouple', async (coupleId, { rejectWithValue }) => {
    const response = await anniversaryServices.apiGetAnniversariesByCouple(coupleId);
    if (!response.success) return rejectWithValue(response)
    return response.result
})