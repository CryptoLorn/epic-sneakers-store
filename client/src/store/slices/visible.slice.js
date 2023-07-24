import {createSlice} from "@reduxjs/toolkit";

const visibleSlice = createSlice({
    name: 'visibleSlice',
    initialState: {
        loginVisible: false,
        registrationVisible: false,
        basketVisible: false,
        confirmationVisible: false,
        editVisible: false,
        typeVisible: false,
        brandVisible: false,
        forgotPasswordVisible: false,
        successfulOrderVisible: false,
        messageVisible: true
    },
    reducers: {
        setLoginVisible: (state, action) => {
            state.loginVisible = action.payload;
        },
        setRegistrationVisible: (state, action) => {
            state.registrationVisible = action.payload;
        },
        setBasketVisible: (state, action) => {
            state.basketVisible= action.payload;
        },
        setConfirmationVisible: (state, action) => {
            state.confirmationVisible = action.payload;
        },
        setEditVisible: (state, action) => {
            state.editVisible = action.payload;
        },
        setTypeVisible: (state, action) => {
            state.typeVisible = action.payload;
        },
        setBrandVisible: (state, action) => {
            state.brandVisible = action.payload;
        },
        setForgotPasswordVisible: (state, action) => {
            state.forgotPasswordVisible = action.payload;
        },
        setSuccessfulOrderVisible: (state, action) => {
            state.successfulOrderVisible = action.payload;
        },
        setMessageVisible: (state, action) => {
            state.messageVisible = action.payload;
        }
    },
})

const visibleReducer = visibleSlice.reducer;

export const {
    setLoginVisible,
    setRegistrationVisible,
    setBasketVisible,
    setConfirmationVisible,
    setEditVisible,
    setTypeVisible,
    setBrandVisible,
    setForgotPasswordVisible,
    setSuccessfulOrderVisible,
    setMessageVisible
} = visibleSlice.actions;

export default visibleReducer;