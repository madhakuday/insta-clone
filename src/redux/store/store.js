import { configureStore } from "@reduxjs/toolkit";
import useReducer from "../reducer/reducer";

const store = configureStore({
  reducer: {
    user: useReducer,
  },
});

export default store;
