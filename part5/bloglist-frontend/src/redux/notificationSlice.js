import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: null, error: false };

const notification = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotificationSuccess(state, action) {
      state.message = action.payload;
    },
    setNotificationError(state, action) {
      state.error = true;
      state.message = action.payload;
    },
    removeNotification() {
      return initialState;
    },
  },
});

export const {
  setNotificationError,
  setNotificationSuccess,
  removeNotification,
} = notification.actions;

export default notification.reducer;
