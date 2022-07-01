import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../app/store';

export interface AuthState {
    username: string | null;
    email: string | null;
    birthdate: string | null;
    location: string | null;
    avatar: string | null;
    token: string | null;
    authorized: boolean;
}

const initialState: AuthState = {
    username: null,
    email: null,
    birthdate: null,
    location: null,
    avatar: null,
    token: null,
    authorized: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (
            state, 
            action: PayloadAction<{ username: string; email: string; birthdate: string; location: string; avatar: string; token: string }>
        ) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.birthdate = action.payload.birthdate;
            state.location = action.payload.location;
            state.avatar = action.payload.avatar;
            state.token = action.payload.token;
            state.authorized = true
        },
        clearAuth: (state) => {
            state.username = null;
            state.email = null;
            state.birthdate = null;
            state.location = null;
            state.avatar = null;
            state.token = null;
            state.authorized = false
        },  
    },
});

export const selectAuth = (state: RootState) => state.auth;

export const { setAuth, clearAuth } = authSlice.actions;

export default authSlice.reducer;