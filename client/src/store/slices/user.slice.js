import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import {userService} from "../../services/user.service";

export const sendPasswordResetEmail = createAsyncThunk(
    'userSlice/sendPasswordResetEmail',
    async ({email}, {dispatch, rejectWithValue}) => {
        try {
            await userService.sendEmail(email);
            dispatch(setError(null));
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

export const restorePassword = createAsyncThunk(
    'userSlice/restorePassword',
    async ({data}, {dispatch, rejectWithValue}) => {
        try {
            await userService.restorePassword(data.password, data.token);
            dispatch(setError(null));
            dispatch(setMessage('Password has been successfully changed!'));
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

export const getAllUsers = createAsyncThunk(
    'userSlice/getAllUsers',
    async ({id}, {dispatch}) => {
        await userService.getAll(id).then(data => dispatch(setUsers([...data])));
    }
)

export const updateUserById = createAsyncThunk(
    'userSlice/updateUserById',
    async ({id, user}, {dispatch, rejectWithValue}) => {
        try {
            const newUser = await userService.updateById(id, user);
            dispatch(updateUser({user: newUser}));

            if (newUser) {
                dispatch(setError(null));
            }
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

export const deleteUserById = createAsyncThunk(
    'userSlice/deleteUserById',
    async ({id}, {dispatch, rejectWithValue}) => {
        try {
            await userService.deleteById(id);
            dispatch(deleteUser({id}));
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        users: [],
        userForUpdate: null,
        error: null,
        message: null
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        userToUpdate: (state, action) => {
            state.userForUpdate = action.payload;
        },
        updateUser: (state, action) => {
            const index = state.users.findIndex(user => user.id === action.payload.user.id);
            state.users[index] = action.payload.user;
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload.id);
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        }
    },
    extraReducers: {
        [sendPasswordResetEmail.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [restorePassword.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [updateUserById.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        }
    }
})

const userReducer = userSlice.reducer;

export const {setUsers, updateUser, userToUpdate, deleteUser, setError, setMessage} = userSlice.actions;
export default userReducer;