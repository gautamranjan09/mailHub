import { createSlice } from "@reduxjs/toolkit";


const navSlice = createSlice({
    name: "navSlice",
    initialState: { selectedMailPath: "inbox", mailCount:0 },
    reducers: {
        setSelectedMailPath(state, action) {
            state.selectedMailPath = action.payload;
        },
        setMailCount(state, action) {
            state.mailCount = action.payload;
        },
    },
});

export const { setSelectedMailPath, setMailCount } = navSlice.actions;
export default navSlice.reducer;
