import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer, { setAnecdotes } from "./reduxSlices/anecdote";
import notificationReducer from "./reduxSlices/notification";
import filterReducer from "./reduxSlices/filterSlice";
import anecdoteService from "./services/anecdotes";

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notifications: notificationReducer,
    filter: filterReducer,
  },
});

anecdoteService.getAll().then((anecdotes) => {
  store.dispatch(setAnecdotes(anecdotes));
});

export default store;
