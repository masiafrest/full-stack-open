import notificationReducer from "./notification";
import deepFreeze from "deep-freeze";

describe("notificationSlice", () => {
  test("setNotification", () => {
    const message = "hello";
    const state = [];
    const action = {
      type: "notifications/setNotification",
      payload: message,
    };

    deepFreeze(state);
    const newState = notificationReducer(state, action);

    expect(newState).toBe(message);
  });

  test("removeNotification", () => {
    const state = [];
    const action = {
      type: "notifications/removeNotification",
    };

    deepFreeze(state);
    const newState = notificationReducer(state, action);
    expect(newState).toBe("");
  });
});
