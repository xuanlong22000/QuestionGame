import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/test/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
