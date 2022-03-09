import { createSlice } from "@reduxjs/toolkit";
import { setNotification } from "./notificationSlice";
import blogService from "../services/blogs";
import loginService from "../services/login";

const user = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(_, action) {
      return action.payload;
    },
    removeUser() {
      return null;
    },
  },
});

export const { setUser, removeUser } = user.actions;

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const user = await loginService.login(credentials);
    blogService.setNewToken(user.token);
    dispatch(setUser(user));
  } catch (error) {
    dispatch(setNotification("Wrong credentials", 5000, true));
  }
};

export default user.reducer;
