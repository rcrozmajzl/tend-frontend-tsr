import { createSlice } from "@reduxjs/toolkit";
import { RootState } from '../app/store';

export interface UserNeeds {
    id: number,
    details_personal: string,
    rating_importance: number,
    rating_frequency: number,
    need: IUserNeeds,
}

export interface IUserNeeds {
    id: number,
    category: string,
    title: string,
    details_general: string,
}

export const userNeedsSlice = createSlice({
    name: "userneeds",
    initialState: [] as UserNeeds[],
    reducers: {
        setUserNeeds: (state, action) => {
            if (!!action.payload) {
                return action.payload
            };
        }
    },
});

export const selectUserNeeds = (state: RootState) => state.userneeds;

export const { setUserNeeds } = userNeedsSlice.actions;

export default userNeedsSlice.reducer;