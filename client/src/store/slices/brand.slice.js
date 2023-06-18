import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import {brandsService} from "../../services/brand.service";

export const getAll = createAsyncThunk(
    'brandSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            return await brandsService.getAll();
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
)

export const createBrand = createAsyncThunk(
    'brandSlice/createBrand',
    async ({data}, {dispatch, rejectWithValue}) => {
        try {
            const newBrand = await brandsService.create(data);
            dispatch(addBrand({data: newBrand}));
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

const brandSlice = createSlice({
    name: 'brandSlice',
    initialState: {
        brands: [],
        selectedBrand: {},
        elementBrand: null,
        status: null,
        error: null
    },
    reducers: {
        addBrand: (state, action) => {
            state.brands.push(action.payload.data);
        },
        setSelectedBrand: (state, action) => {
            state.selectedBrand = action.payload;
        },
        setElementBrand: (state, action) => {
            state.elementBrand = action.payload;
        }
    },
    extraReducers: {
        [getAll.pending]: (state, action) => {
            state.status = 'pending';
            state.error = null;
        },
        [getAll.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.brands = action.payload;
        },
        [getAll.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [createBrand.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        }
    }
})

const brandReducer = brandSlice.reducer;

export const {addBrand, setSelectedBrand, setElementBrand} = brandSlice.actions;
export default brandReducer;