import { createSlice } from "@reduxjs/toolkit";
import { Need } from "../models/need.model";
import { RootState } from '../app/store';


export const needsSlice = createSlice({
    name: "needs",
    initialState: [] as Need[],
    reducers: {
        setNeeds: (state, action) => {
            if (!!action.payload) {
                    return action.payload
            };
        }
    },
});

export const selectNeeds = (state: RootState) => state.needs;

export const { setNeeds } = needsSlice.actions;

export default needsSlice.reducer;