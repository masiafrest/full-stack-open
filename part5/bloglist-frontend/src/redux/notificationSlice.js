import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: null, error: false, timeoutId: null };

const notification = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNoti(state, action) {
      if (state.timeoutId) {
        clearTimeout(state.timeoutId);
      }
      state.message = action.payload;
    },
    setTimeoutId(state, action) {
      state.timeoutId = action.payload;
    },
    removeNotification() {
      return initialState;
    },
  },
});

const { setTimeoutId, setNoti, removeNotification } = notification.actions;

export const setNotification =
  (message, timeout = 5000, error = false) =>
  (dispatch) => {
    dispatch(setNoti(message, error));
    const timeoutId = setTimeout(() => {
      dispatch(removeNotification());
    }, timeout);
    dispatch(setTimeoutId(timeoutId));
  };

export default notification.reducer;
