import { createSlice } from "@reduxjs/toolkit";


const navSlice = createSlice({
    name: "navSlice",
    initialState: { selectedMailPath: "inbox", mailCount:0, totalNumOfMails:0 },
    reducers: {
        setSelectedMailPath(state, action) {
            state.selectedMailPath = action.payload;
        },
        setMailCount(state, action) {
            state.mailCount = action.payload;
        },
        setTotalNumOfMails(state, action) {
            state.totalNumOfMails = action.payload;
        },
    },
});

export const { setSelectedMailPath, setMailCount, setTotalNumOfMails } = navSlice.actions;
export default navSlice.reducer;
