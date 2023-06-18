import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import {ordersService} from "../../services/orders.service";

export const getAllOrdersByBasketId = createAsyncThunk(
    'ordersSlice/getAllOrdersByBasketId',
    async ({id}, {dispatch}) => {
        await ordersService.getAllById(id).then(data => dispatch(setOrders([...data])));
    }
)

export const createOrders = createAsyncThunk(
    'ordersSlice/createOrders',
    async ({data}, {dispatch, rejectWithValue}) => {
        try {
            const newOrders = await ordersService.create(data);
            dispatch(addOrders({data: newOrders}));
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

export const deleteById = createAsyncThunk(
    'ordersSlice/deleteById',
    async ({id}, {dispatch, rejectWithValue}) => {
        try {
            await ordersService.deleteById(id);
            dispatch(deleteOrders({id}));
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

export const deleteAllByBasketId = createAsyncThunk(
    'ordersSlice/deleteAllByBasketId',
    async ({id}, {dispatch, rejectWithValue}) => {
        try {
            await ordersService.deleteAllByBasketId(id);
            dispatch(deleteAllOrders());
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

const ordersSlice = createSlice({
    name: 'ordersSlice',
    initialState: {
        orders: [],
        selectedSize: null,
        error: null
    },
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload;
        },
        addOrders: (state, action) => {
            state.orders.push(action.payload.data);
        },
        deleteOrders: (state, action) => {
            state.orders = state.orders.filter(order => order.id !== action.payload.id);
        },
        deleteAllOrders: (state, action) => {
            state.orders = [];
        },
        setSelectedSize: (state, action) => {
            state.selectedSize = action.payload;

            if (state.selectedSize !== null) {
                state.error = null;
            }
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    },
    extraReducers: {
        [createOrders.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = 'Please specify size!';
        }
    }
})

const ordersReducer = ordersSlice.reducer;

export const {
    setOrders,
    addOrders,
    deleteOrders,
    deleteAllOrders,
    setSelectedSize,
    setError
} = ordersSlice.actions;
export default ordersReducer;