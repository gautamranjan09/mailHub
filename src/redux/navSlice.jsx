import { createSlice } from "@reduxjs/toolkit";


const navSlice = createSlice({
    name: "navSlice",
    initialState: { selectedMailPath: "inbox" },
    reducers: {
        setSelectedMailPath(state, action) {
            state.selectedMailPath = action.payload;
        },
    },
});

export const { setSelectedMailPath } = navSlice.actions;
export default navSlice.reducer;
