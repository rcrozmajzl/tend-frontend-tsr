import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../app/store';
import { Auth } from "../models/auth.model";


export const authSlice = createSlice({
    name: "auth",
    initialState: {} as Auth,
    reducers: {
        setAuth: (
            state, 
            action: PayloadAction<{ user: {id: number; username: string; email: string; birthdate: string; location: string; avatar: string}; jwt: string }>
            ) => {
            state.user.id = action.payload.user.id;
            state.user.username = action.payload.user.username;
            state.user.email = action.payload.user.email;
            state.user.birthdate = action.payload.user.birthdate;
            state.user.location = action.payload.user.location;
            state.user.avatar = action.payload.user.avatar;
            state.jwt = action.payload.jwt;
            state.authorized = true
        },
        clearAuth: (
            state
            ) => {
            state.user.id = -1;
            state.user.username = "";
            state.user.email = "";
            state.user.birthdate = "";
            state.user.location = "";
            state.user.avatar = "";
            state.jwt = "";
            state.authorized = false
        },
    }
});

export const selectAuth = (state: RootState) => state.auth;

export const { setAuth, clearAuth } = authSlice.actions;

export default authSlice.reducer;