import { createSlice } from "@reduxjs/toolkit";


const navSlice = createSlice({
    name: "navSlice",
    initialState: { selectedMailPath: "inbox", mailCount:0, totalNumOfMails:0, totalMailsInPath:[] },
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
        setTotalMailsInPath(state, action) {
            state.totalMailsInPath = action.payload;
        },
    },
});

export const { setSelectedMailPath, setMailCount, setTotalNumOfMails, setTotalMailsInPath } = navSlice.actions;
export default navSlice.reducer;
