import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "appSlice",
  initialState: {
    open: false,
    emails: [],
    searchText: "",
  },
  reducers: {
    //actions
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    setEmails: (state, action) => {
      state.emails = action.payload;
    },
    setSearchText: (state, action) => {
        state.searchText = action.payload;
    },
  },
});

export const { setOpen, setEmails, setSearchText } = appSlice.actions;
export default appSlice.reducer;
