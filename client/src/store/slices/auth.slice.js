import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {authService} from "../../services/auth.service";

export const login = createAsyncThunk(
    'authSlice/login',
    async ({data}, {dispatch, rejectWithValue}) => {
        try {
            await authService.login(data.email, data.password).then(data => {
                dispatch(setUser(data));

                if (data) {
                    dispatch(setError(null));
                }
            })
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

export const registration = createAsyncThunk(
    'authSlice/registration',
    async ({data}, {dispatch, rejectWithValue}) => {
        try {
            await authService.registration(data.email, data.password).then(data => {
                dispatch(setUser(data));

                if (data) {
                    dispatch(setError(null));
                }
            })
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

export const isAuth = createAsyncThunk(
    'authSlice/isAuth',
    async (_, {dispatch, rejectWithValue}) => {
        try {
            await authService.checkIsAuth().then(data => {
                dispatch(setUser(data));
                dispatch(setIsAuth(true));
            })
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        user: null,
        isAuth: null,
        status: null,
        error: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setIsAuth: (state, action) => {
            state.isAuth = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    },
    extraReducers: {
        [login.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [registration.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        }
    }
})

const authReducer = authSlice.reducer;

export const {setUser, setIsAuth, setError} = authSlice.actions;
export default authReducer;