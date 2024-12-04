import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "appSlice",
  initialState: { open: false, emails: [], searchText: "", showSidebar: true, signedUp: false, user: null, profile: null, selectedEmailsArray: [], mailsArrToDelPermanent:[]},
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
    setSignedUp: (state, action) => {
      state.signedIn = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setSelectedEmailsArray: (state, action) => {
      state.selectedEmailsArray = action.payload;
    },
    setMailsArrToDelPermanent: (state, action) => {
      state.mailsArrToDelPermanent = action.payload;
    },
  },
});

export const { setOpen, setEmails, setSearchText, setShowSidebar, setUser, setSignedIn, setProfile, setSelectedEmailsArray, setMailsArrToDelPermanent } = appSlice.actions;

export default appSlice.reducer;
