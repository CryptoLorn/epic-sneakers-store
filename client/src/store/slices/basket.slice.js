import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {basketService} from "../../services/basket.service";

export const getBasketById = createAsyncThunk(
    'basketSlice/getBasketById',
    async ({id}) => {
        await basketService.getById(id);
    }
)

const basketSlice = createSlice({
    name: 'basketSlice',
    initialState: {
    },
    reducers: {
    }
})

const basketReducer = basketSlice.reducer;

export default basketReducer;