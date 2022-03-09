import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "./redux/blogSlice";
import notificationSlice from "./redux/notificationSlice";

const store = configureStore({
  reducer: {
    blogs: blogSlice,
    notification: notificationSlice,
  },
});

export default store;
