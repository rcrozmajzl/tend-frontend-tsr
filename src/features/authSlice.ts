import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../app/store';

export interface AuthState {
    username: string | null;
    email: string | null;
    birthdate: string | null;
    location: string | null;
    avatar: string | null;
    token: string | null;
}

const initialState: AuthState = {
    username: null,
    email: null,
    birthdate: null,
    location: null,
    avatar: null,
    token: null
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (
            state, 
            action: PayloadAction<{ username: string; email: string; birthdate: string; location: string; avatar: string; token: string }>
        ) => {
            localStorage.setItem(
                "user", 
                JSON.stringify({
                    username: action.payload.username,
                    email: action.payload.email,
                    birthdate: action.payload.birthdate,
                    location: action.payload.location,
                    avatar: action.payload.avatar,
                    token: action.payload.token,
                })
            )
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.birthdate = action.payload.birthdate;
            state.location = action.payload.location;
            state.avatar = action.payload.avatar;
            state.token = action.payload.token;
        },
        logoutUser: (state) => {
            localStorage.clear();
            state.username = null;
            state.email = null;
            state.birthdate = null;
            state.location = null;
            state.avatar = null;
            state.token = null;
        },  
    },
});

export const selectAuth = (state: RootState) => state.auth;

export const { setUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;