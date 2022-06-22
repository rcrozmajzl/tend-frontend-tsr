import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../app/store';

export interface OtherUsersState {
    username: string | null;
    email: string | null;
    birthdate: string | null;
    location: string | null;
    avatar: string | null;
    loading: boolean | false;
    error: string | null;
}

const initialState: OtherUsersState = {
    username: null,
    email: null,
    birthdate: null,
    location: null,
    avatar: null,
    loading: false,
    error: null
}

export const otherUsersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setOtherUsers: (
            state,
            action: PayloadAction<{ username: string; email: string; birthdate: string; location: string; avatar: string; loading: boolean; error: any }>
        ) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.birthdate = action.payload.birthdate;
            state.location = action.payload.location;
            state.avatar = action.payload.avatar;
        }
    },
});

export const selectOtherUsers = (state: RootState) => state.users;

export const { setOtherUsers } = otherUsersSlice.actions;

export default otherUsersSlice.reducer;