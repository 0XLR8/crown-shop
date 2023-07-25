import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth: null,
    authPending: true
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCurrentUser: (state, {payload}) => {
            state.auth = payload;
        },
        setAuthPending: (state, {payload}) => {
            state.authPending = payload
        }
    }
});

export const authReducer = authSlice.reducer;

export const authActions = authSlice.actions;