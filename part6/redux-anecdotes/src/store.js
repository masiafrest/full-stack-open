import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "./reduxSlices/anecdote";
import notificationReducer from "./reduxSlices/notification";
import filterReducer from "./reduxSlices/filterSlice";

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notifications: notificationReducer,
    filter: filterReducer,
  },
});

export default store;
