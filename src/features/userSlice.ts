import { createSlice } from "@reduxjs/toolkit";
import { RootState } from '../app/store';

export interface Users {
    id: string | null;
    username: string | null;
    email: string | null;
    birthdate: string | null;
    location: string | null;
    avatar: string | null;
}


export const usersSlice = createSlice({
    name: "users",
    initialState: [] as Users[],
    reducers: {
        setUsers: (state, action) => {
            if (!!action.payload) {
                return action.payload
            }
        }
    },
});

export const selectUsers = (state: RootState) => state.users;

export const { setUsers } = usersSlice.actions;

export default usersSlice.reducer;