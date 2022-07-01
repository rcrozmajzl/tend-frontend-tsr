import { createSlice } from "@reduxjs/toolkit";
import { RootState } from '../app/store';

export interface Needs {
    id: string,
    category: string,
    title: string,
    details_general: string,
}

export const needsSlice = createSlice({
    name: "needs",
    initialState: [] as Needs[],
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