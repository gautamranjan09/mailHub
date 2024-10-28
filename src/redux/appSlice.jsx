import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "appSlice",
  initialState: {
    open: false,
    emails: [],
    searchText: "",
    showSidebar: true,
    signedIn:false,
    user: null,
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
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setSignedIn: (state, action) => {
      state.signedIn = action.payload;
    },

  },
});

export const { setOpen, setEmails, setSearchText, setShowSidebar, setUser,  setSignedIn } = appSlice.actions;

export default appSlice.reducer;
