import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "./reduxSlices/anecdote";
import notificationReducer from "./reduxSlices/notification";

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notifications: notificationReducer,
  },
});

export default store;
