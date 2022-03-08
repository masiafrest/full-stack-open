import { createSlice } from "@reduxjs/toolkit";
const initialState = { message: "", timeoutId: null };

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotification(state, action) {
      if (state.timeoutId) {
        clearTimeout(state.timeoutId);
      }
      state.message = action.payload;
    },
    setTimeoutId(state, action) {
      state.timeoutId = action.payload;
    },
    removeNotification(state) {
      state.message = "";
    },
  },
});

export const { setNotification, removeNotification, setTimeoutId } =
  notificationSlice.actions;

export const setNoti = (message, timeout) => {
  return (dispatch) => {
    dispatch(setNotification(message));
    const timeoutId = setTimeout(() => {
      dispatch(removeNotification());
    }, timeout);
    dispatch(setTimeoutId(timeoutId));
  };
};

export default notificationSlice.reducer;
