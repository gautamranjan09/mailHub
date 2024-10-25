import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "appSlice",
  initialState: {
    open: false,
    emails: [],
    searchText: "",
    showSidebar: true,
    signedIn:false,
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
    setShowSidebar: (state, action) => {
      state.showSidebar = !state.showSidebar;
    },
  },
});

export const { setOpen, setEmails, setSearchText, setShowSidebar } = appSlice.actions;
export default appSlice.reducer;
