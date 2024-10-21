import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";

const store = configureStore({
    reducer: {
        // Add your reducers here
        appSlice:appSlice,
    }
});

export default store;