import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import {analyticsService} from "../../services/analytics.service";

export const getAllAnalytics = createAsyncThunk(
    'analyticsSlice/getAllAnalytics',
    async (_, {dispatch}) => {
        return await analyticsService.getAll().then(data => dispatch(setAnalytics([...data])));
    }
)

export const updateAnalyticsById = createAsyncThunk(
    'analyticsSlice/updateAnalyticsById',
    async ({id, analytic}, {dispatch,rejectWithValue}) => {
        try {
            const newAnalytics = await analyticsService.updateById(id, analytic);
            dispatch(updateAnalytics({analytic: newAnalytics}))
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

const analyticsSlice = createSlice({
    name: 'analyticsSlice',
    initialState: {
        analytics: [],
        analytic: {}
    },
    reducers: {
        setAnalytics: (state, action) => {
            state.analytics = action.payload;
        },
        setAnalytic: (state, action) => {
            state.analytic = action.payload;
        },
        updateAnalytics: (state, action) => {
            const index = state.analytics.findIndex(analytic => analytic.id === action.payload.analytic.id);
            state.analytics[index] = action.payload.analytic;
        }
    },
})

const analyticsReducer = analyticsSlice.reducer;

export const {setAnalytics, updateAnalytics, setAnalytic} = analyticsSlice.actions;
export default analyticsReducer;