import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userslice.js";
import messageSlice from "./messageslice.js"

export const store = configureStore({
  reducer: {
    user: userSlice,
    messages:messageSlice
  },
});
