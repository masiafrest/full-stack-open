import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "./redux/blogSlice";
import notificationSlice from "./redux/notificationSlice";
import userSlice from "./redux/userSlice";

const store = configureStore({
  reducer: {
    blogs: blogSlice,
    notification: notificationSlice,
    user: userSlice,
  },
});

export default store;
