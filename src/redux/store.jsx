import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import navReducer from "./navSlice";

const store = configureStore({
    reducer: {
        // Add your reducers here
        appSlice:appSlice,
        navSlice: navReducer,
    }
});

export default store;